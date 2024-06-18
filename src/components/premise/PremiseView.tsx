import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PremiseTags } from "../uikit/PremiseCard/PremiseCard";
import {
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremiseSlider,
  PremiseTitle,
  Slider,
  SliderItem,
  Tag,
} from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { Link } from "@/navigation";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { AspectRatio } from "~/styled-system/jsx";
import { linkOverlay } from "~/styled-system/patterns";

export async function PremiseView({ id, href }: { id: string; href?: string }) {
  const t = await getTranslations("premise");
  const premise = await prisma.premise.findUnique({
    where: { id },
    include: {
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
    notFound();
  }

  const { slug, name, description, area, resources, openHours } = premise;
  const minPrice = openHours.at(0)?.price;

  const priceLabel =
    minPrice && minPrice !== 0
      ? t("from", { price: priceFormatter.format(minPrice) })
      : t("free");

  return (
    <PremiseCard>
      <PremiseTags>
        <Tag variant="solid" colorPalette="success">
          {area} {t("area_literal")}
        </Tag>
        {minPrice && (
          <Tag variant="solid" colorPalette="primary">
            {priceLabel}
          </Tag>
        )}
      </PremiseTags>
      <PremiseContent
        href={href || `/premises/${slug}`}
        label={t("go_to_premise_page")}
      >
        <PremiseTitle>{name}</PremiseTitle>
        <PremiseDescription>{description}</PremiseDescription>
      </PremiseContent>
      <PremiseSlider>
        <Slider slidesCount={resources.length}>
          {resources.map((item) => (
            <SliderItem key={item.id}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={item.url}
                  alt=""
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fill
                />
                <Link
                  href={href || `/premises/${slug}`}
                  className={linkOverlay()}
                  tabIndex={-1}
                >
                  <span className={css({ srOnly: true })}>
                    {t("go_to_premise_page")}
                  </span>
                </Link>
              </AspectRatio>
            </SliderItem>
          ))}
        </Slider>
      </PremiseSlider>
    </PremiseCard>
  );
}
