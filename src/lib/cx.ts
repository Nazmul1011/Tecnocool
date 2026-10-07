/** Apply a CSS-module class when the feature owns it, otherwise a global design-system class. */
export function cx(
  styles: Record<string, string>,
  ...tokens: Array<string | false | null | undefined>
) {
  return tokens
    .flatMap((token) => (token ? token.split(" ") : []))
    .map((name) => styles[name] ?? name)
    .join(" ");
}
