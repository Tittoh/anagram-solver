export function cleanString(input: string): string {
  return input.replace(/[^a-zA-ZÀ-ÿ]+/g, '');
}
