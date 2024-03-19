import { notFound } from "next/navigation";
import { WeekView } from "@/components/calendar";
import { groupBy } from "@/lib/utils/array";
import {
  generateBookedTimeSlots,
  generateTimeSlots,
} from "@/lib/utils/datetime";
import type { Locale } from "@/navigation";
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
      slots: true,
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

  const timeSlots = premise.openHours.map((openHoursRecord) =>
    generateTimeSlots(openHoursRecord),
  );

  const timeSlotsGroup = groupBy(timeSlots, ({ day }) => day);
  const bookedSlots = generateBookedTimeSlots(premise.slots);

  return (
    <Container>
      <WeekView
        locale={locale}
        todayDate={new Date()}
        timeSlotsGroup={timeSlotsGroup}
        bookedSlots={bookedSlots}
      />
    </Container>
  );
}
