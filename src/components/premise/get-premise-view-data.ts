import { getLocale } from "next-intl/server";
import { formatPriceWithTax } from "@/lib/actions";
import prisma from "@/server/prisma";

export async function getPremiseViewData(id: string) {
  const locale = await getLocale();

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

  if (premise && premise.openHours.length > 0) {
    const minimalPrice = premise.openHours[0].price;
    const minimalPriceWithTax = +formatPriceWithTax(minimalPrice);
    premise.minimalPrice = minimalPriceWithTax;
  }

  return premise;
}
