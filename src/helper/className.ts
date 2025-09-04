export function resolveClassNames(classNames: Record<string, boolean>) {
  return Object.entries(classNames)
    .filter(([_, active]) => active)
    .map(([className]) => className)
    .join(" ");
}
