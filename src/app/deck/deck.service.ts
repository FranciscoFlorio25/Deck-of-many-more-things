import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DeckSet } from '../deck-language';

export type { DeckSet } from '../deck-language';

export interface Card {
  Name: string;
  Set: string;
  Description: string;
  ReappearsInDeck: boolean;
}

export interface DrawResult {
  card: Card;
  consumed: boolean;
  drawNumber: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private originalCards: Card[] = [];
  private currentDeck: Card[] = [];
  private cardsLoaded = false;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  async initializeDeck(deckSet: DeckSet, consumedCardNames: string[] = []): Promise<void> {
    if (!this.cardsLoaded) {
      const cardsUrl = new URL('assets/Cards.json', this.document.baseURI).toString();
      const cards = await firstValueFrom(this.http.get<Card[]>(cardsUrl));
      if (!Array.isArray(cards)) {
        throw new Error('invalidCardData');
      }
      this.originalCards = cards;
      this.cardsLoaded = true;
    }

    const consumedCards = new Set(consumedCardNames);
    this.currentDeck = this.originalCards.filter(card =>
      (deckSet === 'All' || card.Set === deckSet) && !consumedCards.has(card.Name)
    );
  }

  get remainingCards(): number {
    return this.currentDeck.length;
  }

  drawCards(declaredAmount: number): DrawResult[] {
    if (!Number.isInteger(declaredAmount) || declaredAmount <= 0) {
      throw new Error('invalidAmount');
    }
    if (this.currentDeck.length === 0) throw new Error('emptyDeck');
    if (declaredAmount > this.currentDeck.length) {
      throw new Error(`tooManyCards:${this.currentDeck.length}`);
    }

    const results: DrawResult[] = [];
    const availableCards = [...this.currentDeck];

    for (let i = 0; i < declaredAmount; i++) {
      const index = Math.floor(Math.random() * availableCards.length);
      const [drawnCard] = availableCards.splice(index, 1);
      const isConsumed = !drawnCard.ReappearsInDeck;

      if (isConsumed) {
        const deckIndex = this.currentDeck.indexOf(drawnCard);
        this.currentDeck.splice(deckIndex, 1);
      }

      results.push({
        card: drawnCard,
        consumed: isConsumed,
        drawNumber: i + 1
      });
    }

    return results;
  }
}
