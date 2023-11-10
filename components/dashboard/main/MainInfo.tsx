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
      w={["full", "full", "full", "2xl", "4xl", "6xl"]}
      pb={10}
      px={[3, 3, 3, 0, 0, 0]}
      mx={"auto"}
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(5, 1fr)",
        "repeat(5, 1fr)",
      ]}
      templateRows={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={4}
    >
      <GridItem
        rowSpan={[1, 1, 1, 1, 2, 2]}
        colSpan={1}
        bg={"#D4D4D4"}
        borderRadius={10}
      >
        <UpcomingEventsCalendar />
      </GridItem>
      <GridItem colSpan={[1, 1, 1, 1, 2, 2]} bg={"#D4D4D4"} borderRadius={10}>
        <ProfileFilled />
      </GridItem>
      <GridItem
        colSpan={[1, 1, 1, 2, 2, 2]}
        bg={"#D4D4D4"}
        p={5}
        borderRadius={10}
      >
        <Notifications />
      </GridItem>
      <GridItem
        colSpan={[1, 1, 1, 2, 2, 2]}
        bg={"#D4D4D4"}
        borderRadius={10}
        position={"relative"}
      >
        <Popular />
      </GridItem>
      <GridItem
        colSpan={[1, 1, 1, 2, 2, 2]}
        bg={"#D4D4D4"}
        p={5}
        borderRadius={10}
      >
        <FAQ />
      </GridItem>
      <GridItem
        colSpan={[1, 1, 1, 2, 2, 2]}
        bg={"#D4D4D4"}
        borderRadius={10}
        position={"relative"}
      >
        <NextEvent />
      </GridItem>
      <GridItem
        colSpan={[1, 1, 1, 1, 2, 2]}
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
