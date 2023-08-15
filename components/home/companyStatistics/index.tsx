import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Stripes } from "@/components/common/stripes";
import { useLocale } from "@/utils/use-locale";

export const CompanyStatisticsSection = () => {
  const { t } = useLocale();
  return (
    <Container maxWidth={"full"} py={20} bgColor={"brand.primary"}>
      <SimpleGrid columns={[1, 3]} maxWidth={"5xl"} mx={"auto"}>
        <div>
          <Heading variant={"brand"} fontSize={"5xl"}>
            50+
          </Heading>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <Text textAlign={"center"} fontSize={"3xl"}>
            {t("company_statistics.events_held")}
          </Text>
        </div>
        <div>
          <Heading variant={"brand"} fontSize={"5xl"}>
            100+
          </Heading>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <Text textAlign={"center"} fontSize={"3xl"}>
            {t("company_statistics.speakers")}
          </Text>
        </div>
        <div>
          <Heading variant={"brand"} fontSize={"5xl"}>
            150+
          </Heading>
          <Stripes color="#fff" mt="30px" mb="30px" />
          <Text textAlign={"center"} fontSize={"3xl"}>
            {t("company_statistics.connected_establishments")}
          </Text>
        </div>
      </SimpleGrid>
    </Container>
  );
};
