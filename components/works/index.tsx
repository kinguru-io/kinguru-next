import classNames from "classnames";
import { useState } from "react";
import { Section } from "@/components/common/section";
import { Stripes } from "@/components/common/stripes";
import { WorksItem } from "@/components/works/woksItem";
import { useLocale } from "@/utils/use-locale";

const tabsAvailable = ["speakers", "places", "visitors"] as const;
type Tabs = (typeof tabsAvailable)[number];

export const HowItWorks = () => {
  const { t } = useLocale();
  const [tab, setTab] = useState<Tabs>(tabsAvailable[0]);
  return (
    <Section
      id="how_it_works"
      className="bg-[url('/img/parallax-horn.png')] bg-cover bg-fixed bg-bottom bg-no-repeat py-20"
    >
      <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900">
        {t("works.how_it_works")}
      </h2>
      <Stripes />
      <div className="mx-auto w-4/6 lg:flex lg:justify-around">
        {tabsAvailable.map((text) => (
          <button
            key={text}
            onClick={() => setTab(text)}
            className={classNames({
              "text-2xl": true,
              "font-bold": true,
              "z-10": true,
              "my-5": true,
              "mx-auto": true,
              block: true,
              relative: true,
              "after:absolute": text === tab,
              "after:bottom-3.5": text === tab,
              'after:content-[""]': text === tab,
              "after:w-32": text === tab,
              "after:h-5": text === tab,
              "after:bg-primary": text === tab,
              "after:-right-3": text === tab,
              "after:top-5": text === tab,
              "after:-z-10": text === tab,
            })}
          >
            {t(`works.${text}`)}
          </button>
        ))}
      </div>
      <div className="container mx-auto w-4/6 text-center lg:grid lg:grid-cols-3">
        {tab === "speakers"
          ? [
              { title: t("works.target_audience"), image: "/img/1.svg" },
              { title: t("works.compliment_pr"), image: "/img/2.svg" },
              { title: t("works.potential_clients"), image: "/img/3.svg" },
            ].map(({ title, image }) => (
              <WorksItem key={title} title={title} image={image} />
            ))
          : null}
        {tab === "places"
          ? [
              { title: t("works.regular_visitors"), image: "/img/4.svg" },
              { title: t("works.no_dead_lock"), image: "/img/5.svg" },
              { title: t("works.mentions"), image: "/img/6.svg" },
            ].map(({ title, image }) => (
              <WorksItem key={title} title={title} image={image} />
            ))
          : null}
        {tab === "visitors"
          ? [
              { title: t("works.useful_time"), image: "/img/7.svg" },
              {
                title: t("works.participate_in_dialogue"),
                image: "/img/8.svg",
              },
              { title: t("works.networking"), image: "/img/9.svg" },
            ].map(({ title, image }) => (
              <WorksItem key={title} title={title} image={image} />
            ))
          : null}
      </div>
    </Section>
  );
};
