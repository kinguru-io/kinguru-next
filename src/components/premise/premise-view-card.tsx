"use client";
import type {
  Premise,
  PremiseInformation,
  PremiseOpenHours,
  PremiseResource,
} from "@prisma/client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
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
import { formatPriceWithTax } from "@/lib/actions";
import { videoRegex } from "@/lib/shared/utils/regex";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { AspectRatio } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";

export type PremiseViewCardProps = {
  href?: string;
  premise: Premise & {
    openHours: Pick<PremiseOpenHours, "price">[];
    resources: Pick<PremiseResource, "id" | "url">[];
    information: Pick<PremiseInformation, "description">[];
  };
};

export function PremiseViewCard({ href, premise }: PremiseViewCardProps) {
  const t = useTranslations("premise");
  const alt = useTranslations("alt_images");
  const { slug, name, information, area, resources, openHours } = premise;
  const minPrice = openHours.at(0)?.price ?? 0;

  const [priceLabel, setPriceLabel] = useState("Loading...");

  useEffect(() => {
    formatPriceWithTax(minPrice || 0)
      .then((value) => {
        setPriceLabel(t("from", { price: value }));
      })
      .catch(() => {
        setPriceLabel(t("from", { price: "N/A" }));
      });
  }, [minPrice, t]);

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
                        alt={alt("premise_view")}
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
