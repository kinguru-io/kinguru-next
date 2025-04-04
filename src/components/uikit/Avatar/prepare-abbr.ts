const firstLetterRegex = /\b[\w\d]/g;

export function prepareAbbreviation(name: string) {
  const matches = name.match(firstLetterRegex);

  if (!matches) return "";

  return matches[0] + (matches[1] || "");
}
