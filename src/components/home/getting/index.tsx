import {
  Tabs,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Stripes } from "@/components/common/stripes";
import { GettingItem } from "@/components/home/getting/gettingItem.tsx";

const tabsAvailable = ["speakers", "places", "visitors"] as const;

export const WhatAreYouGetting = () => {
  const t = useTranslations();
  return (
    <Container
      maxWidth={"100%"}
      py={16}
      style={{
        background: "url(/img/parallax-horn.png) no-repeat center bottom",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Heading variant={"brand"}>{t("getting.what_are_you_getting")}</Heading>
      <Stripes />
      <Tabs variant="unstyled" w={["full", "3xl"]} mx={"auto"}>
        <TabList flexDir={["column", "column", "row"]}>
          {tabsAvailable.map((text) => (
            <Tab fontSize={["xl", "3xl"]} key={text}>
              {t(`getting.${text}`)}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            {[
              { title: t("getting.target_audience"), image: "/img/1.svg" },
              { title: t("getting.compliment_pr"), image: "/img/2.svg" },
              { title: t("getting.potential_clients"), image: "/img/3.svg" },
            ].map(({ title, image }) => (
              <GettingItem key={title} title={title} image={image} />
            ))}
          </TabPanel>
          <TabPanel>
            {[
              { title: t("getting.regular_visitors"), image: "/img/4.svg" },
              { title: t("getting.no_dead_lock"), image: "/img/5.svg" },
              { title: t("getting.mentions"), image: "/img/6.svg" },
            ].map(({ title, image }) => (
              <GettingItem key={title} title={title} image={image} />
            ))}
          </TabPanel>
          <TabPanel>
            {[
              { title: t("getting.useful_time"), image: "/img/7.svg" },
              {
                title: t("getting.participate_in_dialogue"),
                image: "/img/8.svg",
              },
              { title: t("getting.networking"), image: "/img/9.svg" },
            ].map(({ title, image }) => (
              <GettingItem key={title} title={title} image={image} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
