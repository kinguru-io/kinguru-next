import Image from "next/image";
import { notFound } from "next/navigation";
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
import { Link } from "@/navigation";
import prisma from "@/server/prisma";
import { AspectRatio } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export async function PremiseView({ id }: { id: string }) {
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

  const { name, description, area, resources } = premise;

  return (
    <PremiseCard>
      <PremiseContent>
        <PremiseTextContent>
          <PremiseTitleWrapper>
            <PremiseTitle>{name}</PremiseTitle>
            {area && (
              <PremiseTitleSize>
                ({area} {t("meters")}
                <sup>2</sup>)
              </PremiseTitleSize>
            )}
          </PremiseTitleWrapper>
          <PremiseDescription>{description}</PremiseDescription>
        </PremiseTextContent>
        <Link className={button({ variant: "outline", size: "md" })} href="#">
          {t("more")}
        </Link>
      </PremiseContent>
      <PremiseSlider>
        <Slider slidesCount={resources.length}>
          {resources.map((item) => {
            return (
              <SliderItem key={item.id}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={item.url} fill alt="" />
                </AspectRatio>
              </SliderItem>
            );
          })}
        </Slider>
        <PremisePrice>
          {t("from")} {priceForHour}
        </PremisePrice>
      </PremiseSlider>
    </PremiseCard>
  );
}
