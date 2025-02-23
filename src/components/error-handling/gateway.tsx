"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const MAX_RETRIES = 2;

export const GatewayHandling = () => {
  const router = useRouter();
  const retryCountRef = useRef(0);
  const hasReloadedRef = useRef(false);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScriptError = (event: Event) => {
      event.preventDefault();

      if (hasReloadedRef.current) return;
      if (!(event.target instanceof HTMLScriptElement)) return;

      const scriptSrc = event.target.src;
      console.debug("Script failed to load:", scriptSrc);
      handleRetry(scriptSrc, "Script Load Error");
    };

    const handleChunkLoadError = (error: ErrorEvent) => {
      if (hasReloadedRef.current) return;

      const errorMessage = error.message || "Unknown error";
      const errorSource = error.filename || "Unknown source";

      if (
        errorMessage.includes("Loading chunk") ||
        errorMessage.includes("failed to fetch dynamically imported module") ||
        errorMessage.includes("ERR_ABORTED")
      ) {
        console.debug("Error detected:", {
          message: errorMessage,
          source: errorSource,
          detail: error,
        });

        if (errorMessage.includes("ERR_ABORTED")) {
          console.debug("Handling ERR_ABORTED for:", errorSource);
          console.debug("no_sales_managers:1 GET");
        }

        handleRetry(errorSource, errorMessage);
      }
    };

    const handleRetry = (source: string, errorType: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = window.setTimeout(() => {
        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          hasReloadedRef.current = true;
          console.debug(
            `Retry ${retryCountRef.current} of ${MAX_RETRIES} for ${source} (${errorType}): refreshing...`,
          );
          router.refresh();
        } else {
          console.debug("Maximum retries reached. Not refreshing further.");
        }
      }, 250);
    };

    window.addEventListener("error", handleScriptError, true);
    window.addEventListener("error", handleChunkLoadError);

    return () => {
      window.removeEventListener("error", handleScriptError, true);
      window.removeEventListener("error", handleChunkLoadError);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [router]);

  return null;
};
