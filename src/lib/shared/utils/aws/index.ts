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
      urls.map((url, idx) =>
        fetch(url, {
          method: "PUT",
          body: files[idx],
        }),
      ),
    );

    return fetchResult.map((response, idx) => {
      if (response.status === "rejected") {
        console.error(
          `Upload failed for URL: ${urls[idx]}, reason: ${response.reason}`,
        );
        return null;
      }

      return omitSearchParams ? cutSearchParams(urls[idx]) : urls[idx];
    });
  } catch (error) {
    console.error("Failed to upload image to S3", JSON.stringify(error));
    return [null];
  }
}
