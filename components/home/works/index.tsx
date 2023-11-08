import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { Stripes } from "@/components/common/stripes";
import { WorksItem } from "@/components/home/works/woksItem";
import { useLocale } from "@/utils/use-locale";

export const HowItWorks = () => {
  const { t } = useLocale();
  return (
    <Container
      maxWidth={"100%"}
      py={16}
      style={{
        background:
          "#f7f8f9 url(/img/parallax-speakers.png) no-repeat center center",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <Heading variant={"brand"}>{t("works.how_it_works")}</Heading>
      <Stripes />
      <SimpleGrid maxW={"4xl"} mx={"auto"} gap={5} columns={[1, 4]}>
        {[
          { title: t("works.register") },
          { title: t("works.fill_profile") },
          { title: t("works.pick_subscription") },
          { title: t("works.organize_meetups") },
        ].map((props, i, items) => (
          <WorksItem key={i} last={i === items.length - 1} {...props} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
