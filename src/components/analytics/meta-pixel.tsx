/* eslint-disable @next/next/no-img-element */
import Script from "next/script";
import { useTranslations } from "next-intl";

const metaPixelId = 422859080830645;

export function MetaPixel() {
  const alt = useTranslations("alt_images");
  return (
    <>
      <Script id="meta-pixel">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('consent', 'revoke');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
          height={1}
          width={1}
          alt={alt("facebook")}
          fetchPriority="low"
          loading="lazy"
        />
      </noscript>
    </>
  );
}
