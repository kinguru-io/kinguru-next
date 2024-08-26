export const videoExtensions = [".mov", ".webm", ".mp4", ".ogg", ".ogv"];

export const videoRegex = new RegExp(
  `.+\.(?:${videoExtensions.map((ext) => ext.replace(".", "")).join("|")})\$`,
  "m",
);
