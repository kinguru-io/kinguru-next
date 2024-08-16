import Image from "next/image";
import Script from "next/script";

export const counterYM = 98083142;

export function YandexAnalytics() {
  return (
    <>
      <Script id="yandex-analytics">
        {`
          (function (m, e, t, r, i, k, a) {
            m[i] =
              m[i] ||
              function () {
                (m[i].a = m[i].a || []).push(arguments);
              };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) {
                return;
              }
            }
            (k = e.createElement(t)),
              (a = e.getElementsByTagName(t)[0]),
              (k.async = 1),
              (k.src = r),
              a.parentNode.insertBefore(k, a);
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${counterYM}, "init", {
            defer:true,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        `}
      </Script>
      <noscript>
        <div>
          <Image
            src={`https://mc.yandex.ru/watch/${counterYM}`}
            style={{ position: "absolute", left: "-9999px" }}
            width={1}
            height={1}
            fetchPriority="low"
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
