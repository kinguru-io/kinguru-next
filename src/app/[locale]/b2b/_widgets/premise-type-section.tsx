import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  getPremiseTypePreviewLink,
  premiseTypes,
} from "@/lib/shared/config/premise-types";
import footerLogo from "~/public/img/logotypes/footer-logotype.svg";
import { css } from "~/styled-system/css";
import { Flex, Grid, Stack } from "~/styled-system/jsx";
import { container } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export function PremiseTypeSection({
  anchorSlot,
}: {
  anchorSlot: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <section className={container()}>
      <div
        className={css({
          display: "flex",
          gap: "10",
          flexDirection: "column",
          "& > *": { marginInline: "auto" },
          lg: {
            gap: "28",
            flexDirection: "row",
            "& > *": { marginInline: "unset" },
          },
        })}
      >
        <PremiseTypesGrid />
        <Stack css={{ gap: "6", maxWidth: "lg", md: { gap: "10" } }}>
          <h2
            className={css({
              fontWeight: "900",
              fontSize: "2xl",
              md: {
                fontSize: "4xl",
              },
            })}
          >
            {t("b2b.premise_type_section_title")}
          </h2>
          <PremiseTypesTagList />
          <div
            className={css({
              alignSelf: "center",
              lg: { alignSelf: "flex-start" },
            })}
          >
            {anchorSlot}
          </div>
        </Stack>
      </div>
    </section>
  );
}

const premiseTypePreviewUrls = [
  ...premiseTypes.slice(0, 4).map((type) => getPremiseTypePreviewLink(type)),
  footerLogo.src as string,
  ...premiseTypes.slice(4, 8).map((type) => getPremiseTypePreviewLink(type)),
];

function PremiseTypesGrid() {
  return (
    <Grid
      css={{
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        maxWidth: "sm",
        gap: "2",
        md: { gap: "3", height: "fit-content" },
      }}
    >
      {premiseTypePreviewUrls.map((src) => (
        <PremiseTypeCircle key={src} src={src} />
      ))}
    </Grid>
  );
}

function PremiseTypeCircle({ src }: { src: string }) {
  return (
    <Image
      className={css({
        display: "block",
        objectFit: "cover",
        width: "full",
        height: "full",
        borderRadius: "4xl",
      })}
      alt=""
      src={src}
      width={172}
      height={172}
      unoptimized={src.endsWith(".svg")}
    />
  );
}

function PremiseTypesTagList() {
  const t = useTranslations("premise_types");

  return (
    <Flex
      css={{
        gap: "2",
        flexWrap: "wrap",
        fontWeight: "500",
      }}
    >
      {premiseTypes.slice(0, 9).map((type) => (
        <span
          key={type}
          className={button({
            colorPalette: "light",
            size: { base: "xs", md: "sm" },
          })}
        >
          {t(type)}
        </span>
      ))}
    </Flex>
  );
}
