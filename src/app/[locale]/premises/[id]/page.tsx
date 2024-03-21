import { notFound } from "next/navigation";
import { WeekView } from "@/components/calendar";
import { groupBy } from "@/lib/utils/array";
import {
  generateBookedTimeSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";
import type { Locale } from "@/navigation";
import prisma from "@/server/prisma";
import { Container } from "~/styled-system/jsx";

export default async function PremisePage({
  params: { id, locale },
}: {
  params: { id: string; locale: Locale };
}) {
  const nowDate = new Date();
  const premise = await prisma.premise.findUnique({
    where: { id },
    include: {
      slots: {
        where: {
          date: { gte: nowDate.toISOString() },
        },
      },
      openHours: {
        include: {
          pricing: true,
        },
      },
    },
  });

  if (!premise) {
    notFound();
  }

  const pricings = await prisma.premisePricing.findMany({
    where: {
      premiseOpenHoursId: {
        in: premise.openHours.map((openHoursRecord) => openHoursRecord.id),
      },
    },
    orderBy: { priceForHour: "asc" },
    select: { priceForHour: true },
  });

  const timeSlots = premise.openHours.map((openHoursRecord) =>
    generateTimeSlots(openHoursRecord),
  );

  const timeSlotsGroup = groupBy(timeSlots, ({ day }) => day);
  const bookedSlots = generateBookedTimeSlots(premise.slots);

  return (
    <Container>
      <WeekView
        locale={locale}
        nowDate={nowDate}
        timeSlotsGroup={timeSlotsGroup}
        bookedSlots={bookedSlots}
        aggregatedPrices={{
          minPrice: pricings.at(0)?.priceForHour,
          maxPrice: pricings.at(-1)?.priceForHour,
        }}
      />
    </Container>
  );
}
