import { GetStaticPropsContext } from "next/types";
import { staticPaths } from "@/navigation.ts";
import { ssgInit } from "@/server/ssg-init.ts";

export default function Speakers() {
  return <>Speakers</>;
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

export async function getStaticPaths() {
  return {
    paths: staticPaths,
    fallback: false,
  };
}
