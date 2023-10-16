import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  EventCommentsSection,
  EventDetailsSection,
  EventGuestsSection,
  EventPlaceSection,
  EventSpeakersSection,
} from "@/components/events/details";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import prisma from "@/server/prisma.ts";
import { ssgInit } from "@/server/ssg-init.ts";
import { useLocale } from "@/utils/use-locale.ts";

export default function EventDetails({
  topic,
  description,
  poster,
}: {
  topic: string;
  description: string;
  poster: string;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const eventId =
    !router.query.id || router.query.id instanceof Array ? "" : router.query.id;
  return (
    <>
      <Head>
        <title>
          {topic} - {t("company")}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${topic} - ${t("company")}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={poster} />
      </Head>
      <Navbar />
      <EventDetailsSection eventId={eventId} />
      <EventSpeakersSection eventId={eventId} />
      <EventCommentsSection eventId={eventId} />
      <EventGuestsSection eventId={eventId} />
      <EventPlaceSection eventId={eventId} />
      <FooterSection />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await prisma.event.findMany({
    select: {
      id: true,
    },
  });
  return {
    paths: events.map((event) => ({
      params: {
        id: event.id,
      },
    })),
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const helpers = await ssgInit(context as GetStaticPropsContext);
  const id = context.params?.id as string;
  await helpers.event.getEventDetails.prefetch({ eventId: id });
  await helpers.event.getEventSpeakers.prefetch({ eventId: id });
  await helpers.event.getEventPlace.prefetch({ eventId: id });
  const { topic, description, poster } =
    await helpers.event.getEventDetails.fetch({
      eventId: id,
    });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      topic,
      description,
      poster,
      id,
    },
    revalidate: 1,
  };
}
