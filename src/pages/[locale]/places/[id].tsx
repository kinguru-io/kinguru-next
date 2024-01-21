import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next/types";
import { locales } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { ssgInit } from "@/server/ssg-init.ts";

export default function PlaceDetails() {
  const router = useRouter();
  return <>Place Details: {router.query.id}</>;
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const helpers = await ssgInit();
  return {
    props: {
      messages: (await import(`~/public/locales/${params?.locale}/common.json`))
        .default,
      trpcState: helpers.dehydrate(),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await prisma.place.findMany({
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
