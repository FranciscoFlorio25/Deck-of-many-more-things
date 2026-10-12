import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeckService, DeckSet, DrawResult } from './deck.service';
import { AppLanguage, CARD_TRANSLATIONS, UI_TEXT, UiTextKey } from '../deck-language';
import { ReadingSession, ReadingSessionService } from '../reading-session.service';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  @Input({ required: true }) deckSet!: DeckSet;
  @Input({ required: true }) language!: AppLanguage;
  @Input() sessionId: string | null = null;
  @Output() backToHome = new EventEmitter<void>();
  @Output() languageChange = new EventEmitter<AppLanguage>();
  @Output() sessionChanged = new EventEmitter<void>();
  @Output() sessionSelected = new EventEmitter<ReadingSession>();

  cardsToDraw: number = 1;
  drawnCards: DrawResult[] = [];
  errorMessage: string = '';
  sessionName = '';
  activeSession: ReadingSession | null = null;
  availableSessions: ReadingSession[] = [];
  sessionToSwitchId = '';

  private readonly palettes = ['jade', 'wine', 'indigo', 'amber', 'teal', 'plum'];

  constructor(
    public deckService: DeckService,
    private readonly readingSessions: ReadingSessionService
  ) {}

  async ngOnInit() {
    try {
      await this.deckService.initializeDeck(this.deckSet);
    } catch (error: unknown) {
      console.error('Unable to load the local card data.', error);
      this.errorMessage = this.text('loadError');
      return;
    }
    try {
      this.availableSessions = await this.readingSessions.getSessions();
      const session = this.sessionId ? this.availableSessions.find(saved => saved.id === this.sessionId) : undefined;
      if (this.sessionId && !session) {
        this.errorMessage = this.text('sessionNotFound');
        return;
      }
      this.activeSession = session ?? null;
      if (session) {
        this.deckSet = session.deckSet;
        this.sessionToSwitchId = session.id;
        await this.deckService.initializeDeck(this.deckSet, session.consumedCardNames);
        this.drawnCards = [...session.history];
      }
    } catch {
      this.errorMessage = this.text('sessionStorageError');
    }
  }

  async onDraw() {
    this.errorMessage = '';
    try {
      const results = this.deckService.drawCards(this.cardsToDraw);
      if (this.activeSession) {
        const firstNumber = this.activeSession.history.length + 1;
        const sessionResults = results.map((result, index) => ({
          ...result,
          drawNumber: firstNumber + index
        }));
        this.activeSession.history.push(...sessionResults);
        for (const result of sessionResults) {
          if (result.consumed && !this.activeSession.consumedCardNames.includes(result.card.Name)) {
            this.activeSession.consumedCardNames.push(result.card.Name);
          }
        }
        this.drawnCards = [...this.activeSession.history];
        await this.persistActiveSession();
      } else {
        this.drawnCards = results;
      }
    } catch (error: unknown) {
      const errorCode = error instanceof Error ? error.message : '';
      if (errorCode === 'invalidAmount') {
        this.errorMessage = this.text('invalidAmount');
      } else if (errorCode === 'emptyDeck') {
        this.errorMessage = this.text('emptyDeck');
      } else if (errorCode.startsWith('tooManyCards:')) {
        const count = errorCode.slice('tooManyCards:'.length);
        this.errorMessage = this.text('tooManyCards').replace('{count}', count);
      } else {
        this.errorMessage = this.text('sessionStorageError');
      }
    }
  }

  async createSession(): Promise<void> {
    const name = this.sessionName.trim();
    if (!name) {
      this.errorMessage = this.text('sessionNameRequired');
      return;
    }
    try {
      await this.deckService.initializeDeck(this.deckSet);
    } catch (error: unknown) {
      console.error('Unable to load the local card data.', error);
      this.errorMessage = this.text('loadError');
      return;
    }
    try {
      const session = await this.readingSessions.createSession(name, this.deckSet);
      this.activeSession = session;
      this.sessionToSwitchId = session.id;
      this.availableSessions = await this.readingSessions.getSessions();
      this.sessionName = '';
      this.drawnCards = [];
      this.errorMessage = '';
      this.sessionSelected.emit(session);
      this.sessionChanged.emit();
    } catch {
      this.errorMessage = this.text('sessionStorageError');
    }
  }

  async resetDrawnCards(): Promise<void> {
    if (!this.activeSession) return;
    const previousConsumedCards = this.activeSession.consumedCardNames;
    this.activeSession.consumedCardNames = [];
    try {
      await this.persistActiveSession();
    } catch {
      this.activeSession.consumedCardNames = previousConsumedCards;
      this.errorMessage = this.text('sessionStorageError');
      return;
    }
    try {
      await this.deckService.initializeDeck(this.deckSet);
      this.errorMessage = '';
    } catch {
      this.errorMessage = this.text('loadError');
    }
  }

  async clearHistory(): Promise<void> {
    if (!this.activeSession) return;
    const previousHistory = this.activeSession.history;
    this.activeSession.history = [];
    this.drawnCards = [];
    try {
      await this.persistActiveSession();
      this.errorMessage = '';
    } catch {
      this.activeSession.history = previousHistory;
      this.drawnCards = [...previousHistory];
      this.errorMessage = this.text('sessionStorageError');
    }
  }

  async switchSession(): Promise<void> {
    if (!this.sessionToSwitchId || this.sessionToSwitchId === this.activeSession?.id) return;
    try {
      const session = await this.readingSessions.getSession(this.sessionToSwitchId);
      if (!session) {
        this.errorMessage = this.text('sessionNotFound');
        return;
      }
      await this.deckService.initializeDeck(session.deckSet, session.consumedCardNames);
      this.activeSession = session;
      this.deckSet = session.deckSet;
      this.drawnCards = [...session.history];
      this.errorMessage = '';
      this.sessionSelected.emit(session);
    } catch {
      this.errorMessage = this.text('sessionStorageError');
    }
  }

  private async persistActiveSession(): Promise<void> {
    if (!this.activeSession) return;
    await this.readingSessions.saveSession(this.activeSession);
    this.availableSessions = await this.readingSessions.getSessions();
    this.sessionChanged.emit();
  }

  text(key: UiTextKey): string {
    return UI_TEXT[key][this.language];
  }

  deckTitle(): string {
    if (this.deckSet === 'All') {
      return this.language === 'es' ? 'Los 66 arcanos' : 'All 66 Arcana';
    }

    if (this.deckSet === 'Original') {
      return this.language === 'es' ? 'Muchas cosas' : 'Many Things';
    }

    return this.language === 'es' ? 'Muchas más cosas' : 'Many More Things';
  }

  deckSetName(set: string): string {
    return set === 'Original' ? this.text('originalSet') : this.text('moreSet');
  }

  cardName(name: string): string {
    return this.language === 'es' ? CARD_TRANSLATIONS[name]?.nameEs ?? name : name;
  }

  cardDescription(name: string, description: string): string {
    if (this.language === 'en') {
      return CARD_TRANSLATIONS[name]?.descriptionEn ?? description;
    }

    return description;
  }

  cardPaletteFor(name: string): string {
    return this.palettes[this.hashName(name.trim().toLowerCase()) % this.palettes.length];
  }

  cardIconFor(name: string): string {
    return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  private hashName(name: string): number {
    let hash = 0;

    for (let index = 0; index < name.length; index++) {
      hash = (hash * 31 + name.charCodeAt(index)) >>> 0;
    }

    return hash;
  }
}
