export const formatText = (text: string) => {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.*?)__/g, "<strong>$1</strong>");
};
