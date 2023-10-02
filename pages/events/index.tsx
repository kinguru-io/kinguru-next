import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import moment from "moment/moment";
import { Search } from "@/components/events/search";
import {
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
} from "@/utils/elasticsearch/config-helper.js";
import { useNextRouting } from "@/utils/elasticsearch/useNextRouting.tsx";
import { useLocale } from "@/utils/use-locale.ts";

export default function Events() {
  const { t } = useLocale();
  const connector = new ElasticsearchAPIConnector({
    host: process.env.NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT,
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
  return <Search config={combinedConfig} />;
}
