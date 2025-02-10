"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import "./GoogleTranslateMenu.css";

export const GoogleTranslateMenu = () => {
  const pathname = usePathname();
  const isBlogPage = pathname.includes("blog");

  useEffect(() => {
    if (!isBlogPage) return;
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&hl=en";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,it,pl",
            autoDisplay: true,
          },
          "google-select",
        );
      }
    };

    return () => {
      window.location.reload();

      script.remove();
      const widget = document.getElementById("google-select");
      if (widget) widget.innerHTML = "";
    };
  }, [pathname]);

  return <>{isBlogPage && <div id="google-select" />}</>;
};
