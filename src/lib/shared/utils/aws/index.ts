import { cutSearchParams } from "../url";

export async function safeUploadToBucket({
  urls,
  files,
  omitSearchParams = true,
}: {
  urls: string[];
  files: File[];
  omitSearchParams?: boolean;
}) {
  try {
    const fetchResult = await Promise.allSettled(
      urls.map((url, idx) => fetch(url, { method: "PUT", body: files[idx] })),
    );

    return fetchResult.map((response, idx) => {
      if (response.status === "rejected") return null;

      return omitSearchParams ? cutSearchParams(urls[idx]) : urls[idx];
    });
  } catch (_) {
    return Array.from({ length: urls.length }, () => null);
  }
}
