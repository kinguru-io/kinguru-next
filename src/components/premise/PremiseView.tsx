import Image from "next/image";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
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
import { Link, type Locale } from "@/navigation";
import prisma from "@/server/prisma";
import { button } from "~/styled-system/recipes";

export async function PremiseView({ id }: { id: string }) {
  const t = await getTranslations("premise");
  const locale = useLocale() as Locale;
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
        select: {
          id: true,
        },
      },
    },
  });

  if (!premise) {
    notFound();
  }

  // looking for the minimal price beetwen all working hours
  const {
    _min: { priceForHour },
  } = await prisma.premisePricing.aggregate({
    where: {
      premiseOpenHoursId: {
        in: premise.openHours.map((dayInfo) => dayInfo.id),
      },
    },
    _min: {
      priceForHour: true,
    },
  });

  const { slug, name, description, area, resources } = premise;

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
          className={button({ variant: "outline", size: "md" })}
          href={`/premises/${slug}`}
        >
          {t("more")}
        </Link>
      </PremiseContent>
      <PremiseSlider>
        <Slider slidesCount={resources.length}>
          {resources.map((item) => {
            return (
              <SliderItem key={item.id}>
                <Image src={item.url} width={391} height={220} alt="" />
              </SliderItem>
            );
          })}
        </Slider>
        {priceForHour && (
          <PremisePrice>
            {t("from", { price: priceFormatter.format(priceForHour) })}
          </PremisePrice>
        )}
      </PremiseSlider>
    </PremiseCard>
  );
}
