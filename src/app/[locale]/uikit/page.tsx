import { notFound } from "next/navigation";
import { useLocale } from "next-intl";
import { WeekView } from "./WeekView";
import { Locale } from "@/navigation";
import { Container } from "~/styled-system/jsx";

export default async function Uikit() {
  const premise = await prisma.premise.findFirst({
    include: {
      openHours: {
        include: {
          pricing: true,
        },
      },
    },
  });
  const locale = useLocale() as Locale;

  if (!premise) {
    return notFound();
  }
  console.log(premise.openHours.at(0)?.pricing);

  return (
    <Container>
      <WeekView locale={locale} todayDate={new Date()} />
    </Container>
  );
}
