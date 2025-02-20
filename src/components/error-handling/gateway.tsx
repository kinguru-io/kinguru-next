"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const MAX_RETRIES = 1;

export const GatewayHandling = () => {
  const router = useRouter();
  const retryCountRef = useRef(0);

  useEffect(() => {
    const handleScriptError = (event: Event) => {
      if (event.target instanceof HTMLScriptElement) {
        console.debug("JavaScript failed to load:", event.target.src);

        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          console.debug(
            `Retry ${retryCountRef.current} of ${MAX_RETRIES}: refreshing...`,
          );
          router.refresh();
        } else {
          console.debug("Maximum retries reached. Not refreshing further.");
        }
      }
    };

    window.addEventListener("error", handleScriptError, true);
    return () => {
      window.removeEventListener("error", handleScriptError, true);
    };
  }, []);

  return null;
};
