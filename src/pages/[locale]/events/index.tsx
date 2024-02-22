import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import moment from "moment/moment";
import Head from "next/head";
import { GetStaticPropsContext } from "next/types";
import { useTranslations } from "next-intl";
import { Search } from "@/components/events/search";
import { staticPaths } from "@/navigation.ts";
import { ssgInit } from "@/server/ssg-init.ts";
import {
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
} from "@/utils/elasticsearch/config-helper.js";
import { useNextRouting } from "@/utils/elasticsearch/useNextRouting.tsx";

export default function Events() {
  const t = useTranslations();
  const connector = new ElasticsearchAPIConnector({
    host: process.env.NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT,
    apiKey: process.env.NEXT_PUBLIC_ELASTICSEARCH_API_KEY,
    index: "kinguru.public.event",
  });
  const combinedConfig = useNextRouting(
    {
      searchQuery: {
        facets: {
          ...buildFacetConfigFromConfig(),
          starts: {
            type: "range",
            ranges: [
              {
                from: moment().diff(moment(0), "milliseconds") * 1000,
                to:
                  moment().add(1, "days").diff(moment(0), "milliseconds") *
                  1000,
                name: t("events.start_today_or_tomorrow"),
              },
              {
                from: moment().diff(moment(0), "milliseconds") * 1000,
                to:
                  moment().add(7, "days").diff(moment(0), "milliseconds") *
                  1000,
                name: t("events.start_this_week"),
              },
              {
                from: moment().diff(moment(0), "milliseconds") * 1000,
                to:
                  moment().add(30, "days").diff(moment(0), "milliseconds") *
                  1000,
                name: t("events.start_this_month"),
              },
              {
                from: moment().diff(moment(0), "milliseconds") * 1000,
                to:
                  moment().add(365, "days").diff(moment(0), "milliseconds") *
                  1000,
                name: t("events.start_this_year"),
              },
            ],
          },
          price: {
            type: "range",
            ranges: [
              {
                from: 0.0,
                to: 0.001,
                name: t("events.free"),
              },
              {
                from: 0.01,
                to: 5,
                name: t("events.up_to_5_zl"),
              },
              {
                from: 5,
                to: 10,
                name: t("events.from_5_to_10_zl"),
              },
            ],
          },
        },
        ...buildSearchOptionsFromConfig(),
      },
      apiConnector: connector,
      alwaysSearchOnInitialLoad: true,
    },
    "/events",
  );
  return (
    <>
      <Head>
        <title>{t("metadata.events.title")}</title>
        <meta name="description" content={t("metadata.events.description")} />
        <meta property="og:title" content={t("metadata.events.title")} />
        <meta
          property="og:description"
          content={t("metadata.events.description")}
        />
        <meta
          property="og:image"
          content="https://eventify.today/img/brand.png"
        />
      </Head>
      <Search config={combinedConfig} />
    </>
  );
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
