import { eachHourOfInterval, isWithinInterval, subHours } from "date-fns";
import { notFound } from "next/navigation";
import { WeekView } from "@/components/week-view";
import { groupBy } from "@/lib/utils/array";
import { Locale } from "@/navigation";
import prisma from "@/server/prisma";
import { Container } from "~/styled-system/jsx";

export default async function PremisePage({
  params: { id, locale },
}: {
  params: { id: string; locale: Locale };
  searchParams: { originDate?: string };
}) {
  const premise = await prisma.premise.findUnique({
    where: { id },
    include: {
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

  const timeSlots = premise.openHours.map(
    ({ openTime, closeTime, day, pricing }) => {
      return {
        day,
        timeSlots: eachHourOfInterval({
          start: openTime,
          end: subHours(closeTime, 1), // do not count the last hour as an interval
        }).map((time) => {
          const { priceForHour } =
            pricing.find(
              ({ startTime: pricingStartTime, endTime: pricingEndTime }) =>
                isWithinInterval(time, {
                  start: pricingStartTime,
                  end: pricingEndTime,
                }),
            ) || {};

          return {
            time,
            price: priceForHour || 0,
          };
        }),
      };
    },
  );

  const timeSlotsGroup = groupBy(timeSlots, ({ day }) => day);

  return (
    <Container>
      <WeekView
        locale={locale}
        todayDate={new Date()}
        timeSlotsGroup={timeSlotsGroup}
      />
    </Container>
  );
}
