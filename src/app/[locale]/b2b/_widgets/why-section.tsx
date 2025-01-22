import { useTranslations } from "next-intl";
import { BlogLinkCard } from "./blog-link-card";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";

/* TODO should be generated dynamically once blog functionality is done */
const blogPages = {
  en: [
    {
      title: "More new customers",
      subtitle:
        "Our site has over 5,000 monthly users who are ready to book a location! We have high-quality traffic thanks to our SEO and targeted advertising.",
    },
    {
      title: "Free registration",
      subtitle: "Join at no cost and start earning on your location today!",
    },
    {
      title: "The commission is paid upon booking",
      subtitle: "A minimum commission of 15% is charged. Registration is free.",
    },
    {
      title: "We will turn your clients into loyal customers!",
      subtitle:
        "Thanks to our unique booking automation system and discount program. Register on the platform for free!",
    },
    {
      title: "You no longer need a sales manager or advertising!",
      subtitle:
        "Our platform will handle everything related to finding, selling, and retaining clients for your venue!",
    },
    {
      title: "You maintain full control",
      subtitle: "You decide which bookings to approve and which to decline.",
    },
  ],
  pl: [
    {
      title: "Wi cej klient w",
      subtitle:
        "Nasz portal ma ponad 5 000 miesi cznych u ytkownik w, gotowych do rezerwacji lokalu! Posiadamy wysokiej jako ci ruch dzi ki naszym wysi ukom SEO i celowanym reklamom.",
    },
    {
      title: "Rejestracja jest za darmo",
      subtitle:
        "Do aduj za darmo i zaczyna zarabia  na swoim lokalu ju dzisiaj!",
    },
    {
      title: "Wynagrodzenie jest wyp acane przy rezerwacji",
      subtitle: "Minimalna prowizja to 15%. Rejestracja jest za darmo.",
    },
    {
      title: "Przekszta limy twoich klient w w lojalnych klient w!",
      subtitle:
        "Dzi ki naszemu systemowi automatyzacji rezerwacji i programowi rabatowemu. Do aduj na portalu za darmo!",
    },
    {
      title: "Nie potrzebujesz ju mened era sprzeda y ani reklam!",
      subtitle:
        "Nasz portal zajmie si wszystkim, co wi ze si z poszukiwaniem, sprzeda  i utrzymaniem klient w w Twoim lokalu!",
    },
    {
      title: "Zachowujesz pe n  kontrol ",
      subtitle:
        "Ty decydujesz, kt re rezerwacje zaakceptowa  i kt re odrzuci .",
    },
  ],
};

export function WhySection({
  anchorSlot,
  locale,
}: {
  anchorSlot: React.ReactNode;
  locale: string; // TODO locale is used to provide mockup for blog pages for different language. remove once blog functionality is done
}) {
  const t = useTranslations("b2b");

  return (
    <section className={container()}>
      <h2
        className={css({
          position: "relative",
          textAlign: "center",
          fontWeight: "900",
          fontSize: "2xl",
          zIndex: "1",
          md: {
            maxWidth: "fit-content",
            fontSize: "5xl",
            textAlign: "start",
          },
        })}
      >
        {t.rich("why_section_title", {
          brand: (chunks) => (
            <>
              <span
                aria-hidden
                className={css({
                  textTransform: "uppercase",
                  color: "light",
                  position: "absolute",
                  fontWeight: "500",
                  zIndex: "-1",
                  insetInlineStart: "50%",
                  transform: "translateX(-50%) scale(3)",
                })}
              >
                {chunks}
              </span>
              <span className={css({ textTransform: "uppercase" })}>
                {chunks}
              </span>
            </>
          ),
        })}
      </h2>
      <ul
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
          marginBlockStart: "10",
          marginBlockEnd: "10",
          md: {
            marginBlockStart: "11",
            flexDirection: "row",
            flexWrap: "wrap",
            "& > *": {
              flexGrow: "1",
              flexBasis: "96",
            },
          },
        })}
      >
        {/* TODO should be generated dynamically once blog functionality is done */}
        {blogPages[locale as keyof typeof blogPages].map((info, idx) => (
          <BlogLinkCard key={info.title} step={idx + 1} {...info} href="#" />
        ))}
      </ul>
      <div className={css({ marginInline: "auto", width: "fit-content" })}>
        {anchorSlot}
      </div>
    </section>
  );
}
