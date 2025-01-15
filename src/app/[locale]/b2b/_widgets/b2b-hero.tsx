import { useTranslations } from "next-intl";
import { GlowEffectBox } from "./glow-effect-box";
import { css } from "~/styled-system/css";
import { Box, Float } from "~/styled-system/jsx";
import { container } from "~/styled-system/patterns";

export function B2BHero() {
  const t = useTranslations("b2b");

  return (
    <Box
      css={{
        overflow: "hidden",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        bgPosition: "center",
      }}
      style={{
        backgroundImage: `
          linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.68) 50%),
          url(https://kinguru-storage.s3.pl-waw.scw.cloud/marketing/background-b2b.jpg)
        `,
      }}
    >
      <section
        className={container({
          position: "relative",
          color: "light",
          paddingBlock: "40",
          md: {
            paddingBlock: "80",
          },
        })}
      >
        <h1
          className={css({
            maxWidth: "breakpoint-md",
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
            marginBlockEnd: "4",
            md: { textAlign: "start", fontSize: "5xl" },
          })}
        >
          {t("title")}
        </h1>
        <p
          className={css({
            fontSize: "xl",
            textAlign: "center",
            md: { textAlign: "start", fontSize: "2xl" },
          })}
        >
          {t("subtitle")}
        </p>
        <Float offsetY={{ base: "-10", md: "32" }} placement="top-start">
          <GlowEffectBox size={75} />
        </Float>
        <Float
          offsetY={{ base: "-10", md: "52" }}
          offsetX={{ base: "0", md: "52" }}
          placement="bottom-end"
        >
          <GlowEffectBox size={105} />
        </Float>
      </section>
    </Box>
  );
}
