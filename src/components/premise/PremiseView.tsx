import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Video } from "../common";
import { PremiseTags } from "../uikit/PremiseCard/PremiseCard";
import {
  ArrowIcon,
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremiseSlider,
  PremiseTitle,
  Slider,
  SliderItem,
  Tag,
} from "@/components/uikit";
import { videoRegex } from "@/lib/shared/utils/regex";
import { priceFormatter } from "@/lib/utils";
import { Link } from "@/navigation";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { AspectRatio } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";

export async function PremiseView({ id, href }: { id: string; href?: string }) {
  const locale = await getLocale();
  const t = await getTranslations("premise");
  const premise = await prisma.premise.findUnique({
    where: { id },
    include: {
      information: { where: { locale }, select: { description: true } },
      resources: {
        select: {
          id: true,
          url: true,
        },
      },
      openHours: {
        select: { price: true },
        orderBy: { price: "asc" },
      },
    },
  });

  if (!premise) {
    return null;
  }

  const { slug, name, information, area, resources, openHours } = premise;
  const minPrice = openHours.at(0)?.price;

  const priceLabel = t("from", { price: priceFormatter.format(minPrice || 0) });

  return (
    <PremiseCard>
      <PremiseTags>
        <Tag variant="solid" colorPalette="success">
          {area} {t("area_literal")}
        </Tag>
        <Tag variant="solid" colorPalette="primary">
          {priceLabel}
        </Tag>
      </PremiseTags>
      <PremiseContent
        href={href || `/premise/${slug}`}
        label={t("go_to_premise_page")}
      >
        <PremiseTitle>{name}</PremiseTitle>
        <PremiseDescription>
          {information.at(0)?.description}
        </PremiseDescription>
      </PremiseContent>
      <PremiseSlider>
        <Slider slidesCount={resources.length}>
          {resources.map((item) => {
            const isVideo = videoRegex.test(item.url);

            return (
              <SliderItem key={item.id}>
                <AspectRatio ratio={16 / 9}>
                  {isVideo ? (
                    <Video src={item.url} stateControlOnly />
                  ) : (
                    <>
                      <Image
                        src={item.url}
                        alt=""
                        sizes="(max-width: 712px) 100vw, (max-width: 1056px) 50vw, 33vw"
                        fill
                      />
                      <Link
                        href={href || `/premise/${slug}`}
                        className={linkOverlay()}
                        tabIndex={-1}
                      >
                        <span className={css({ srOnly: true })}>
                          {t("go_to_premise_page")}
                        </span>
                      </Link>
                    </>
                  )}
                </AspectRatio>
              </SliderItem>
            );
          })}
        </Slider>
      </PremiseSlider>
      {href && (
        <Link
          className={css({
            fontSize: "sm",
            color: "success.darker",
            _hoverOrFocusVisible: { textDecoration: "underline" },
          })}
          href={`/premise/${slug}`}
          target="_blank"
        >
          {t("go_to_premise_page")} <ArrowIcon direction="right" />
        </Link>
      )}
    </PremiseCard>
  );
}
