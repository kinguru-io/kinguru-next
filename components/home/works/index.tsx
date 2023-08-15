import {
  Tabs,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Stripes } from "@/components/common/stripes";
import { WorksItem } from "@/components/home/works/woksItem";
import { useLocale } from "@/utils/use-locale";

const tabsAvailable = ["speakers", "places", "visitors"] as const;

export const HowItWorks = () => {
  const { t } = useLocale();
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
      <Heading variant={"brand"}>{t("works.how_it_works")}</Heading>
      <Stripes />
      <Tabs variant="unstyled" w={["full", "3xl"]} mx={"auto"}>
        <TabList>
          {tabsAvailable.map((text) => (
            <Tab fontSize={["xl", "3xl"]} key={text}>
              {t(`works.${text}`)}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            {[
              { title: t("works.target_audience"), image: "/img/1.svg" },
              { title: t("works.compliment_pr"), image: "/img/2.svg" },
              { title: t("works.potential_clients"), image: "/img/3.svg" },
            ].map(({ title, image }) => (
              <WorksItem key={title} title={title} image={image} />
            ))}
          </TabPanel>
          <TabPanel>
            {[
              { title: t("works.regular_visitors"), image: "/img/4.svg" },
              { title: t("works.no_dead_lock"), image: "/img/5.svg" },
              { title: t("works.mentions"), image: "/img/6.svg" },
            ].map(({ title, image }) => (
              <WorksItem key={title} title={title} image={image} />
            ))}
          </TabPanel>
          <TabPanel>
            {[
              { title: t("works.useful_time"), image: "/img/7.svg" },
              {
                title: t("works.participate_in_dialogue"),
                image: "/img/8.svg",
              },
              { title: t("works.networking"), image: "/img/9.svg" },
            ].map(({ title, image }) => (
              <WorksItem key={title} title={title} image={image} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
