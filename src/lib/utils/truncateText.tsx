export function truncateText(
  text: string,
  maxLength: number,
  addEllipsis = true,
): string {
  if (text.length <= maxLength) return text;

  const trimmedText = text.substring(0, maxLength).trim();
  const lastSpaceIndex = trimmedText.lastIndexOf(" ");

  if (lastSpaceIndex > 0) {
    return (
      trimmedText.substring(0, lastSpaceIndex) + (addEllipsis ? "..." : "")
    );
  }

  return trimmedText + (addEllipsis ? "..." : "");
}
