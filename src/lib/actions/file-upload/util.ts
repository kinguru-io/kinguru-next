import { imageSchema, videoSchema } from "./validation";
import { groupBy } from "@/lib/shared/utils/array";

export type ImageActionData = Pick<File, "name" | "size" | "type">;

export function preprocessFiles<T extends ImageActionData>(
  files: T[],
  left?: number,
) {
  if (!files) return [];

  const groupedFiles = groupBy(files, (item) => {
    if (imageSchema.safeParse(item).success) return "images";
    if (videoSchema.safeParse(item).success) return "videos";
    return "else";
  });

  const { images = [], videos } = groupedFiles;

  const resultList = images.slice(0, (left || 12) - (videos ? 1 : 0));

  if (videos) {
    resultList.push(videos[0]);
  }

  return resultList;
}
