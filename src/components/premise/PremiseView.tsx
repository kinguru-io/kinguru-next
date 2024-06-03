import Image from "next/image";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import {
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremisePrice,
  PremiseSlider,
  PremiseTextContent,
  PremiseTitle,
  PremiseTitleSize,
  PremiseTitleWrapper,
  Slider,
  SliderItem,
} from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { Link } from "@/navigation";
import prisma from "@/server/prisma";
import { AspectRatio } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export async function PremiseView({
  id,
  href,
  linkLabel,
}: {
  id: string;
  href?: string;
  linkLabel?: string;
}) {
  const t = await getTranslations("premise");
  const locale = await getLocale();
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

  return (
    <PremiseCard>
      <PremiseContent>
        <PremiseTextContent>
          <PremiseTitleWrapper>
            <PremiseTitle>{name}</PremiseTitle>
            {area && (
              <PremiseTitleSize>
                (
                {area.toLocaleString(locale, {
                  style: "unit",
                  unit: "meter",
                })}
                <sup>2</sup>)
              </PremiseTitleSize>
            )}
          </PremiseTitleWrapper>
          <PremiseDescription>{description}</PremiseDescription>
        </PremiseTextContent>
        <Link
          className={button({
            // TODO add button variants to props in case anything other is needed
            variant: linkLabel ? "solid" : "outline",
            size: "md",
          })}
          href={href || `/premises/${slug}`}
        >
          {linkLabel || t("more")}
        </Link>
      </PremiseContent>
      <PremiseSlider>
        <Slider slidesCount={resources.length}>
          {resources.map((item) => {
            return (
              <SliderItem key={item.id}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={item.url} width={391} height={220} alt="" />
                </AspectRatio>
              </SliderItem>
            );
          })}
        </Slider>
        {minPrice && (
          <PremisePrice>
            {t("from", { price: priceFormatter.format(minPrice) })}
          </PremisePrice>
        )}
      </PremiseSlider>
    </PremiseCard>
  );
}
