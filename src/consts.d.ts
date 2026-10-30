interface Path {
  path: string;
  title: string;
  chapter: string;
  number: number;
}

export const paths: Path[];
export function pathToPascalCase(path: string): string;
