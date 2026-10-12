import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import type { DeckSet } from './deck-language';
import type { DrawResult } from './deck/deck.service';

export interface ReadingSession {
  id: string;
  name: string;
  deckSet: DeckSet;
  createdAt: string;
  updatedAt: string;
  history: DrawResult[];
  consumedCardNames: string[];
}

@Injectable({ providedIn: 'root' })
export class ReadingSessionService {
  private readonly storageKey = 'deck-of-many-more-things.sessions';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  async getSessions(): Promise<ReadingSession[]> {
    const value = await this.readStorage();
    if (value === null) return [];

    let sessions: unknown;
    try {
      sessions = JSON.parse(value);
    } catch {
      throw new Error('sessionDataInvalid');
    }

    if (!Array.isArray(sessions) || !sessions.every(session => this.isReadingSession(session))) {
      throw new Error('sessionDataInvalid');
    }

    return sessions;
  }

  async getSession(id: string): Promise<ReadingSession | undefined> {
    return (await this.getSessions()).find(session => session.id === id);
  }

  async createSession(name: string, deckSet: DeckSet): Promise<ReadingSession> {
    const now = new Date().toISOString();
    const session: ReadingSession = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      deckSet,
      createdAt: now,
      updatedAt: now,
      history: [],
      consumedCardNames: []
    };
    await this.saveSession(session);
    return session;
  }

  async saveSession(session: ReadingSession): Promise<void> {
    const sessions = await this.getSessions();
    session.updatedAt = new Date().toISOString();
    const existingIndex = sessions.findIndex(saved => saved.id === session.id);
    if (existingIndex === -1) {
      sessions.unshift(session);
    } else {
      sessions[existingIndex] = session;
    }
    await this.writeStorage(JSON.stringify(sessions));
  }

  async deleteSession(id: string): Promise<void> {
    const sessions = await this.getSessions();
    await this.writeStorage(JSON.stringify(sessions.filter(session => session.id !== id)));
  }

  private async readStorage(): Promise<string | null> {
    if (this.document.defaultView?.desktopSessionStorage) {
      const savedSessions = await this.document.defaultView.desktopSessionStorage.read();
      if (savedSessions !== null) return savedSessions;

      const legacySessions = this.readLegacyLocalSessions();
      if (legacySessions !== null) {
        await this.document.defaultView.desktopSessionStorage.write(legacySessions);
      }
      return legacySessions;
    }
    return this.localStorage().getItem(this.storageKey);
  }

  private async writeStorage(contents: string): Promise<void> {
    if (this.document.defaultView?.desktopSessionStorage) {
      await this.document.defaultView.desktopSessionStorage.write(contents);
      return;
    }
    this.localStorage().setItem(this.storageKey, contents);
  }

  private readLegacyLocalSessions(): string | null {
    try {
      return this.localStorage().getItem(this.storageKey);
    } catch (error) {
      console.warn('Unable to access legacy browser sessions; continuing with desktop storage.', error);
      return null;
    }
  }

  private localStorage(): Storage {
    const storage = this.document.defaultView?.localStorage;
    if (!storage) throw new Error('sessionStorageUnavailable');
    return storage;
  }

  private isReadingSession(value: unknown): value is ReadingSession {
    if (!value || typeof value !== 'object') return false;
    const session = value as Partial<ReadingSession>;
    return typeof session.id === 'string'
      && typeof session.name === 'string'
      && (session.deckSet === 'Original' || session.deckSet === 'More Things' || session.deckSet === 'All')
      && typeof session.createdAt === 'string'
      && typeof session.updatedAt === 'string'
      && Array.isArray(session.history)
      && session.history.every(result => !!result
        && typeof result === 'object'
        && typeof result.card?.Name === 'string'
        && typeof result.card?.Set === 'string'
        && typeof result.card?.Description === 'string'
        && typeof result.card?.ReappearsInDeck === 'boolean'
        && typeof result.consumed === 'boolean'
        && Number.isInteger(result.drawNumber))
      && Array.isArray(session.consumedCardNames)
      && session.consumedCardNames.every(name => typeof name === 'string');
  }
}
