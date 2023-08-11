import { Section } from "@/components/common/section";
import { Stripes } from "@/components/common/stripes";
import { EventCard } from "@/components/events/eventCard";
import { trpc } from "@/utils/trpc";
import { useLocale } from "@/utils/use-locale";

export const Events = () => {
  const { t } = useLocale();
  const { data: upcomingEvents } = trpc.event.upcoming.useQuery();
  const { data: recentEvents } = trpc.event.recent.useQuery();
  return (
    <>
      <Section id="events" className="mt-16">
        <h2
          id="upcoming_events"
          className="text-center text-4xl font-bold tracking-tight text-gray-900"
        >
          {t("events.upcoming_events")}
        </h2>
        <Stripes />
        {!upcomingEvents?.length ? (
          <p className="m-auto block text-center">{t("events.not_found")}</p>
        ) : (
          <div className="mt-6 content-center space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {upcomingEvents?.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        )}
      </Section>
      <Section>
        <h2
          id="recent_events"
          className="text-center text-4xl font-bold tracking-tight text-gray-900"
        >
          {t("events.recent_events")}
        </h2>
        <Stripes />
        {!recentEvents?.length ? (
          <p className="m-auto block text-center">{t("events.not_found")}</p>
        ) : (
          <div className="mt-6 content-center space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {recentEvents?.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
};
