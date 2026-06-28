export type ClassValue = string | false | null | undefined

/** Minimal class-name joiner — filters out falsy values and joins with spaces. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
