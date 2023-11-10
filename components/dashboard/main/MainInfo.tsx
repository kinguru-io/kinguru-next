import { Grid, GridItem } from "@chakra-ui/react";
import { FC } from "react";
import {
  FAQ,
  NextEvent,
  Notifications,
  Popular,
  ProfileFilled,
  Profit,
  Total,
  UpcomingEventsCalendar,
} from "@/components/dashboard/main";

export const MainInfo: FC = () => {
  return (
    <Grid
      w={"4xl"}
      py={10}
      mx={0}
      templateColumns="repeat(5, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} bg={"#D4D4D4"} p={5} borderRadius={10}>
        <UpcomingEventsCalendar />
      </GridItem>
      <GridItem colSpan={2} bg={"#D4D4D4"} p={5} borderRadius={10}>
        <ProfileFilled />
      </GridItem>
      <GridItem colSpan={2} bg={"#D4D4D4"} p={5} borderRadius={10}>
        <Notifications />
      </GridItem>
      <GridItem colSpan={2} bg={"#D4D4D4"} p={5} borderRadius={10}>
        <Popular />
      </GridItem>
      <GridItem colSpan={2} bg={"#D4D4D4"} p={5} borderRadius={10}>
        <FAQ />
      </GridItem>
      <GridItem
        colSpan={2}
        bg={"#D4D4D4"}
        borderRadius={10}
        position={"relative"}
      >
        <NextEvent />
      </GridItem>
      <GridItem
        colSpan={2}
        bg={"#D4D4D4"}
        borderRadius={10}
        position={"relative"}
      >
        <Profit />
      </GridItem>
      <GridItem
        colSpan={1}
        bg={"#D4D4D4"}
        borderRadius={10}
        position={"relative"}
      >
        <Total />
      </GridItem>
    </Grid>
  );
};
