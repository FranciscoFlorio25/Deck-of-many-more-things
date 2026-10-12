import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { DeckComponent } from './deck/deck.component';
import { AppLanguage, DeckSet, UI_TEXT, UiTextKey } from './deck-language';
import { ReadingSession, ReadingSessionService } from './reading-session.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DeckComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedDeck: DeckSet | null = null;
  selectedSessionId: string | null = null;
  sessions: ReadingSession[] = [];
  sessionStorageError = false;
  language: AppLanguage = 'en';

  constructor(
    private readonly title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly readingSessions: ReadingSessionService
  ) {
    this.updatePageLanguage();
  }

  get isDesktopApp(): boolean {
    return this.document.defaultView?.desktopSessionStorage !== undefined;
  }

  ngOnInit(): void {
    void this.refreshSessions();
  }

  text(key: UiTextKey): string {
    return UI_TEXT[key][this.language];
  }

  setLanguage(language: AppLanguage): void {
    this.language = language;
    this.updatePageLanguage();
  }

  chooseDeck(deckSet: DeckSet): void {
    this.selectedDeck = deckSet;
    this.selectedSessionId = null;
  }

  openSession(session: ReadingSession): void {
    this.selectedDeck = session.deckSet;
    this.selectedSessionId = session.id;
  }

  async deleteSession(session: ReadingSession): Promise<void> {
    if (!this.document.defaultView?.confirm(this.text('deleteSessionConfirm'))) return;
    try {
      await this.readingSessions.deleteSession(session.id);
      if (this.selectedSessionId === session.id) this.returnHome();
      await this.refreshSessions();
    } catch {
      this.sessionStorageError = true;
    }
  }

  setCurrentSession(session: ReadingSession): void {
    this.selectedDeck = session.deckSet;
    this.selectedSessionId = session.id;
  }

  returnHome(): void {
    this.selectedDeck = null;
    this.selectedSessionId = null;
  }

  async refreshSessions(): Promise<void> {
    try {
      this.sessions = await this.readingSessions.getSessions();
      this.sessionStorageError = false;
    } catch {
      this.sessionStorageError = true;
    }
  }

  private updatePageLanguage(): void {
    this.document.documentElement.lang = this.language;
    this.title.setTitle(this.text('appTitle'));
  }
}
