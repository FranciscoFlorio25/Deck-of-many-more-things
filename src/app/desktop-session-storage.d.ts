interface DesktopSessionStorage {
  read(): Promise<string | null>;
  write(contents: string): Promise<void>;
}

interface Window {
  desktopSessionStorage?: DesktopSessionStorage;
}
