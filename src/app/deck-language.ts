export type AppLanguage = 'en' | 'es';
export type DeckSet = 'Original' | 'More Things' | 'All';

export const UI_TEXT = {
  appTitle: { en: 'Deck of Many More Things', es: 'Mazo de Muchas Más Cosas' },
  homeEyebrow: { en: 'A divination deck for the curious', es: 'Un mazo de adivinación para curiosos' },
  homeTitleFirst: { en: 'Choose your', es: 'Elige tu' },
  homeTitleAccent: { en: 'arcana', es: 'arcano' },
  homeIntro: {
    en: 'Three decks wait in the shadows. Choose one, and let fate turn the first card.',
    es: 'Tres mazos aguardan en las sombras. Elige uno y deja que el destino revele la primera carta.'
  },
  originalKicker: { en: 'The classic reading', es: 'La lectura clásica' },
  originalDescription: {
    en: 'The original fates. Twenty-two cards of wonder, ruin, and possibility.',
    es: 'Los destinos originales. Veintidós cartas de asombro, ruina y posibilidades.'
  },
  moreKicker: { en: 'The expanded reading', es: 'La lectura ampliada' },
  moreDescription: {
    en: 'Forty-four strange new fates, woven from the wider planes.',
    es: 'Cuarenta y cuatro nuevos destinos, tejidos en los planos exteriores.'
  },
  allKicker: { en: 'The complete reading', es: 'La lectura completa' },
  allDescription: {
    en: 'Every card from both decks. Sixty-six paths, and no way to know which is yours.',
    es: 'Todas las cartas de ambos mazos. Sesenta y seis caminos, sin saber cuál será el tuyo.'
  },
  enterDeck: { en: 'Enter this deck', es: 'Entrar al mazo' },
  cards: { en: 'cards', es: 'cartas' },
  homeFooter: { en: 'The future belongs to no one.', es: 'El futuro no pertenece a nadie.' },
  backHome: { en: 'Choose another deck', es: 'Elegir otro mazo' },
  savedSessionsEyebrow: { en: 'Your chronicles', es: 'Tus crónicas' },
  savedSessions: { en: 'Saved sessions', es: 'Sesiones guardadas' },
  openSession: { en: 'Open', es: 'Abrir' },
  switchSession: { en: 'Switch session', es: 'Cambiar sesión' },
  deleteSession: { en: 'Delete', es: 'Borrar' },
  deleteSessionConfirm: { en: 'Delete this saved session and its history?', es: '¿Borrar esta sesión guardada y todo su historial?' },
  historyDrawSingular: { en: 'draw', es: 'extracción' },
  historyDrawPlural: { en: 'draws', es: 'extracciones' },
  sessionNameLabel: { en: 'Name this session', es: 'Nombre de la sesión' },
  sessionNamePlaceholder: { en: 'e.g. The northern campaign', es: 'p. ej., La campaña del norte' },
  createSession: { en: 'Start session', es: 'Iniciar sesión' },
  activeSession: { en: 'Current session', es: 'Sesión actual' },
  resetDrawnCards: { en: 'Reset drawn cards', es: 'Reiniciar cartas salidas' },
  clearHistory: { en: 'Clear history', es: 'Borrar historial' },
  historyKeptNotice: { en: 'Resetting the deck keeps this session’s history.', es: 'Reiniciar el mazo conserva el historial de esta sesión.' },
  sessionNameRequired: { en: 'Enter a name for this session.', es: 'Escribe un nombre para la sesión.' },
  sessionNotFound: { en: 'This saved session could not be found.', es: 'No se encontró la sesión guardada.' },
  sessionStorageError: { en: 'Sessions could not be read or saved. Check that the app data folder is writable and try again.', es: 'No se pudieron leer o guardar las sesiones. Comprueba que la carpeta de datos de la aplicación permita escritura e inténtalo de nuevo.' },
  storageLocation: {
    en: 'Desktop sessions are stored in data/sessions.json beside the app when writable; otherwise they use the operating system’s app-data folder.',
    es: 'Las sesiones se guardan en data/sessions.json junto a la aplicación si se puede escribir; de lo contrario, se usa la carpeta de datos de la aplicación del sistema.'
  },
  pageEyebrow: { en: 'The Arcana of the Unknown', es: 'Los arcanos de lo desconocido' },
  pageIntro: {
    en: 'An ancient deck. A single choice. A fate not yet written.',
    es: 'Un mazo ancestral. Una elección. Un destino aún por escribirse.'
  },
  readingTable: { en: 'The reading table', es: 'La mesa de lectura' },
  panelCaption: { en: 'Let the deck reveal its secrets', es: 'Deja que el mazo revele sus secretos' },
  cardsInDeck: { en: 'cards in the deck', es: 'cartas en el mazo' },
  chooseFate: { en: 'Choose your fate', es: 'Elige tu destino' },
  draw: { en: 'Draw from the deck', es: 'Robar del mazo' },
  readingEyebrow: { en: 'The veil is lifted', es: 'El velo se ha alzado' },
  revealedArcana: { en: 'Your revealed arcana', es: 'Tus arcanos revelados' },
  revealed: { en: 'revealed', es: 'reveladas' },
  originalSet: { en: 'The Original', es: 'El original' },
  moreSet: { en: 'More Things', es: 'Más cosas' },
  allSet: { en: 'The complete deck', es: 'El mazo completo' },
  leavesDeck: { en: 'Leaves the deck forever', es: 'Desaparece para siempre del mazo' },
  returnsDeck: { en: 'Will return to the deck', es: 'Volverá al mazo' },
  welcomeTitle: { en: 'Your story starts with a card', es: 'Tu historia empieza con una carta' },
  welcomeDescription: {
    en: 'Choose how many to draw above. Each one holds a different twist of fate.',
    es: 'Elige arriba cuántas cartas robar. Cada una guarda un giro distinto del destino.'
  },
  footer: {
    en: 'The future is delightfully unpredictable.',
    es: 'El futuro es deliciosamente impredecible.'
  },
  loadError: {
    en: 'The magical deck could not be loaded. Check that assets/Cards.json exists.',
    es: 'No se pudo cargar el mazo mágico. Comprueba que exista assets/Cards.json.'
  },
  invalidAmount: {
    en: 'Choose a whole number of at least 1 card.',
    es: 'Elige un número entero de al menos 1 carta.'
  },
  emptyDeck: { en: 'The deck is empty.', es: 'El mazo está vacío.' },
  tooManyCards: {
    en: 'You can draw at most {count} different cards.',
    es: 'Puedes robar como máximo {count} cartas distintas.'
  },
  languageLabel: { en: 'Language', es: 'Idioma' },
  english: { en: 'English', es: 'Inglés' },
  spanish: { en: 'Spanish', es: 'Español' },
  drawNumber: { en: 'No.', es: 'N.º' }
} as const;

export type UiTextKey = keyof typeof UI_TEXT;

interface CardTranslation {
  nameEs: string;
  descriptionEn: string;
}

export const CARD_TRANSLATIONS: Record<string, CardTranslation> = {
  Balance: { nameEs: 'Equilibrio', descriptionEn: 'Your mind suffers a drastic alteration. Your alignment changes radically. If you fail to act according to it, you incur a penalty.' },
  Comet: { nameEs: 'Cometa', descriptionEn: 'If you defeat the next hostile monster or group of monsters you encounter on your own, you gain enough experience to advance a level.' },
  Donjon: { nameEs: 'Calabozo', descriptionEn: 'You disappear and become trapped in a sphere in a state of suspended animation. Your equipment is left behind. Divination magic cannot locate you.' },
  Euryale: { nameEs: 'Euryale', descriptionEn: 'The medusa’s face curses your saving throws, giving you a permanent −2 penalty to all of them. Only a god or the Fates card can lift the curse.' },
  'The Fates': { nameEs: 'Las Parcas', descriptionEn: 'The fabric of reality unravels. You can avoid or erase any event as though it never happened. You may use this magic whenever you wish.' },
  Flames: { nameEs: 'Llamas', descriptionEn: 'A powerful devil becomes your enemy. It will try to ruin your life before killing you. This enmity lasts until one of you dies.' },
  Fool: { nameEs: 'El Loco', descriptionEn: 'You lose 10,000 XP (or one level). In addition, you must draw another card from the deck.' },
  Gem: { nameEs: 'Gema', descriptionEn: 'Fifty gems worth 1,000 gp each, or fifty pieces of jewelry of the same value, appear at your feet.' },
  Idiot: { nameEs: 'Idiota', descriptionEn: 'Your Intelligence is permanently reduced by 1d4 + 1 (minimum 1). You may optionally draw another card.' },
  Jester: { nameEs: 'Bufón', descriptionEn: 'You gain 10,000 XP (or one level), or you may draw two additional cards. The choice is yours.' },
  Key: { nameEs: 'Llave', descriptionEn: 'A rare or rarer magic weapon you are proficient with appears in your hands. The DM chooses the weapon.' },
  Knight: { nameEs: 'Caballero', descriptionEn: 'You gain the service of a 4th-level warrior who appears magically and swears undying loyalty to you.' },
  Moon: { nameEs: 'Luna', descriptionEn: 'You gain the power to cast the wish spell 1d3 times.' },
  Rogue: { nameEs: 'Pícaro', descriptionEn: 'An NPC chosen by the DM secretly becomes your mortal enemy. They will hide their hostility until the moment they strike.' },
  Ruin: { nameEs: 'Ruina', descriptionEn: 'You lose all nonmagical wealth you possess. Your lands, property, and money disappear.' },
  Skull: { nameEs: 'Calavera', descriptionEn: 'You summon an Avatar of Death. You must fight it alone; if anyone helps you, another Avatar appears.' },
  Star: { nameEs: 'Estrella', descriptionEn: 'Increase one of your ability scores by 2. The maximum for that score becomes 24.' },
  Sun: { nameEs: 'Sol', descriptionEn: 'You gain 50,000 XP and a wondrous magic item chosen by the DM.' },
  Talons: { nameEs: 'Garras', descriptionEn: 'Every magic item you wear or carry disintegrates permanently.' },
  Throne: { nameEs: 'Trono', descriptionEn: 'You gain proficiency in Persuasion and a noble title to a small castle, which you must claim by slaying the monsters within.' },
  Vizier: { nameEs: 'Visir', descriptionEn: 'You may ask one question and receive a true, comprehensible telepathic answer, along with the wisdom to apply it.' },
  'The Void': { nameEs: 'El Vacío', descriptionEn: 'Your soul is drawn from your body and trapped in an object guarded by powerful beings. Your body is left catatonic.' },
  Aberration: { nameEs: 'Aberración', descriptionEn: 'You gain telepathy out to 120 feet, but your mind becomes vulnerable to psychic intrusion and nightmares.' },
  Beast: { nameEs: 'Bestia', descriptionEn: 'You gain the ability to temporarily transform into a fearsome beast, or permanently acquire animal traits.' },
  Book: { nameEs: 'Libro', descriptionEn: 'You gain profound knowledge instantly. Become proficient in an Intelligence-based skill and fluent in additional languages.' },
  Bridge: { nameEs: 'Puente', descriptionEn: 'A magical bond forms between you and another creature, allowing telepathic communication across any distance.' },
  Camp: { nameEs: 'Campamento', descriptionEn: 'A fully equipped safe haven appears before you. Resting here grants the greatest possible healing benefits.' },
  Celestial: { nameEs: 'Celestial', descriptionEn: 'A celestial being blesses you. You receive a powerful healing benefit and attract the attention of the upper planes.' },
  Construct: { nameEs: 'Constructo', descriptionEn: 'A mechanical guardian awakens from its slumber and serves you with absolute loyalty until it is destroyed.' },
  Corpse: { nameEs: 'Cadáver', descriptionEn: 'A figure from your past returns from the dead. They may be an ally restored to life or a revenant seeking vengeance.' },
  Crossroads: { nameEs: 'Encrucijada', descriptionEn: 'You must make a crucial choice that will alter the course of the campaign. Time stands still until you choose a path.' },
  Door: { nameEs: 'Puerta', descriptionEn: 'A dimensional doorway appears, leading directly to a place you deeply desire or desperately need to visit.' },
  Dragon: { nameEs: 'Dragón', descriptionEn: 'A dragon egg appears in your care, or you incur the relentless enmity of an ancient dragon.' },
  Elemental: { nameEs: 'Elemental', descriptionEn: 'You absorb the power of the primordial planes, gaining permanent resistance to one type of elemental damage.' },
  Expert: { nameEs: 'Experto', descriptionEn: 'An incomparable master offers to train you, granting permanent mastery of a specific skill.' },
  Fey: { nameEs: 'Feérico', descriptionEn: 'An archfey offers you a bargain that seems too good to be true, bound by deceptive conditions.' },
  Fiend: { nameEs: 'Infernal', descriptionEn: 'A devil or demon grants you immediate, dangerous power in exchange for a dark favor it will collect in the future.' },
  Giant: { nameEs: 'Gigante', descriptionEn: 'Your physical size increases to Large. Your Strength increases enormously for the next month.' },
  Humanoid: { nameEs: 'Humanoide', descriptionEn: 'An unexpected, powerful humanoid ally swears unconditional loyalty to you, bringing their own political baggage.' },
  Map: { nameEs: 'Mapa', descriptionEn: 'A mystical map is etched into your mind, revealing the exact route to a legendary artifact.' },
  Maze: { nameEs: 'Laberinto', descriptionEn: 'You are banished to a labyrinthine demiplane. Find the exit using only your wits, without resorting to magic.' },
  Mine: { nameEs: 'Mina', descriptionEn: 'You discover the deed to a mine rich in precious minerals, but something dark slumbers in its depths.' },
  Monstrosity: { nameEs: 'Monstruosidad', descriptionEn: 'A curse shadows your blood. The next time you suffer lethal damage, you summon an uncontrollable monstrosity.' },
  Ooze: { nameEs: 'Limo', descriptionEn: 'Your nonmagical equipment slowly corrodes as though covered in searing acid.' },
  Oubliette: { nameEs: 'Mazmorra', descriptionEn: 'You fall into an extradimensional prison. You can escape only if another creature willingly takes your place.' },
  Path: { nameEs: 'Sendero', descriptionEn: 'Your understanding of terrain and space improves dramatically. Your movement speed permanently increases by 10 feet.' },
  Pit: { nameEs: 'Foso', descriptionEn: 'The ground vanishes beneath your feet, hurling you into a deep pit filled with unknown traps.' },
  Plant: { nameEs: 'Planta', descriptionEn: 'You gain the magical ability to communicate with plant life and move through dense terrain without leaving a trace.' },
  Priest: { nameEs: 'Sacerdote', descriptionEn: 'A powerful cleric intervenes on your behalf. They may grant you a divine blessing or cure any affliction.' },
  Prisoner: { nameEs: 'Prisionero', descriptionEn: 'A chained figure materializes. Freeing them promises a great reward, but you might be unleashing a tyrant.' },
  Puzzle: { nameEs: 'Acertijo', descriptionEn: 'You are trapped by a complex riddle. Solve it to escape; failure carries deadly consequences.' },
  Ring: { nameEs: 'Anillo', descriptionEn: 'A rare magic ring appears on your finger. It holds immense power, but if you remove it, it is destroyed forever.' },
  Shield: { nameEs: 'Escudo', descriptionEn: 'A permanent spectral force field surrounds you, granting a +2 bonus to your Armor Class.' },
  Staff: { nameEs: 'Bastón', descriptionEn: 'A staff imbued with ancient, dormant magic appears in your hands. You must adventure to discover its command word.' },
  Stairway: { nameEs: 'Escalera', descriptionEn: 'An ethereal staircase descends from the sky or rises from the ground, letting you travel to another plane of existence.' },
  Statue: { nameEs: 'Estatua', descriptionEn: 'You are temporarily petrified. While made of stone, your awareness expands and you can hear nearby thoughts.' },
  Swarm: { nameEs: 'Enjambre', descriptionEn: 'A devouring swarm magically consumes all your rations and potions at once, but ignores your gold and weapons.' },
  Tavern: { nameEs: 'Taberna', descriptionEn: 'You gain access to a hidden interdimensional tavern where vital information can be found—for the right price.' },
  Temple: { nameEs: 'Templo', descriptionEn: 'A deity turns its gaze upon you. You receive an immense divine favor, bound to an unavoidable geas.' },
  Tomb: { nameEs: 'Tumba', descriptionEn: 'You learn of a forgotten crypt containing unimaginable treasure, guarded by ancient horrors.' },
  Tower: { nameEs: 'Torre', descriptionEn: 'A fortified tower magically rises from the earth at a location of your choice, becoming your legal property.' },
  Tree: { nameEs: 'Árbol', descriptionEn: 'A mystical tree instantly grows. Its fruit may grant permanent blessings or lethally poison whoever eats it.' },
  Undead: { nameEs: 'No muerto', descriptionEn: 'The curse of undeath brushes your soul. Your hit point maximum is severely reduced until you find a powerful purification.' },
  Wand: { nameEs: 'Varita', descriptionEn: 'A highly unstable wand appears in your possession. When its charges run out, it detonates catastrophically.' },
  Weapon: { nameEs: 'Arma', descriptionEn: 'You instantly master a devastating weapon that materializes before you, but it demands blood regularly.' },
  Well: { nameEs: 'Pozo', descriptionEn: 'A shining wishing well appears. You may make a wish, but its interpretation will be twisted and literal.' }
};
