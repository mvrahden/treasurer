export interface ReaderConfig {
  sync?: boolean;
  fileSystem?: { encoding: string; flag?: string; } | string | null;
}
