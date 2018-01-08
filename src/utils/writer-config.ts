export interface WriterConfig {
  sync?: boolean;
  fileSystem?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | null;
}
