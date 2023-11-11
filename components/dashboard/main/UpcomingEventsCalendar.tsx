import { Container, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import { FC } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const UpcomingEventsCalendar: FC = () => {
  const { t } = useLocale();
  return (
    <Container py={5}>
      <Heading fontSize={"lg"}>{t("dashboard.main_upcoming_events")}</Heading>
      <Heading mt={3} fontSize={"md"} textAlign={"center"}>
        November
      </Heading>
      <Grid
        mt={2}
        templateColumns={"repeat(7, 1fr)"}
        templateRows={"repeat(5, 1fr)"}
        gap={1}
      >
        {new Array(35)
          .fill({})
          .map((_, i) => i - moment("11.01.2023").day())
          .map((n) => {
            return (
              <GridItem
                key={n}
                colSpan={1}
                rowSpan={1}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                borderRadius={10}
                bg={
                  moment("11.01.2023").add(n, "days").month() !== 10
                    ? "#e0e0e0"
                    : moment("11.01.2023").add(n, "days").day() === 6 ||
                      moment("11.01.2023").add(n, "days").day() === 0
                    ? "#eeeeee"
                    : "white"
                }
                p={1.5}
              >
                <Text p={0.5}>
                  {moment("11.01.2023").add(n, "days").date()}
                </Text>
              </GridItem>
            );
          })}
      </Grid>
    </Container>
  );
};
