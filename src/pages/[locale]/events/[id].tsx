import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import {
  EventCommentsSection,
  EventDetailsSection,
  EventGuestsSection,
  EventPlaceSection,
  EventSpeakersSection,
} from "@/components/events/details";
import { FooterSection } from "@/components/footerOld";
import { Navbar } from "@/components/navbar";
import { locales } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { ssgInit } from "@/server/ssg-init.ts";

export default function EventDetails({
  topic,
  description,
  poster,
}: {
  topic: string;
  description: string;
  poster: string;
}) {
  const t = useTranslations();
  const router = useRouter();
  const eventId =
    !router.query.id || router.query.id instanceof Array ? "" : router.query.id;
  const title = `${topic} - ${t("company")}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
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
    paths: locales
      .map((locale) =>
        events.map((event) => ({
          params: {
            id: event.id,
            locale,
          },
        })),
      )
      .flat(),
    fallback: "blocking",
  };
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string; locale: string }>) {
  const helpers = await ssgInit();
  const id = params?.id as string;
  await helpers.event.getEventDetails.prefetch({ eventId: id });
  await helpers.event.getEventSpeakers.prefetch({ eventId: id });
  await helpers.event.getEventPlace.prefetch({ eventId: id });
  const { topic, description, poster } =
    await helpers.event.getEventDetails.fetch({
      eventId: id,
    });
  return {
    props: {
      messages: (await import(`~/public/locales/${params?.locale}/common.json`))
        .default,
      trpcState: helpers.dehydrate(),
      topic,
      description,
      poster,
      id,
    },
    revalidate: 10,
  };
}
