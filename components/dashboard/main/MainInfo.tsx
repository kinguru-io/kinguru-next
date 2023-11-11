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
  const mainInfoItems = [
    {
      colSpan: 1,
      rowSpan: [1, 1, 1, 2, 2, 2],
      Component: UpcomingEventsCalendar,
    },
    {
      colSpan: [1, 1, 1, 1, 2, 2],
      Component: ProfileFilled,
    },
    {
      colSpan: [1, 1, 1, 1, 2, 2],
      Component: Notifications,
    },
    {
      colSpan: [1, 1, 1, 1, 2, 2],
      Component: Popular,
    },
    {
      colSpan: [1, 1, 1, 1, 2, 2],
      Component: FAQ,
    },
    {
      colSpan: [1, 1, 1, 2, 2, 2],
      Component: NextEvent,
    },
    {
      colSpan: [1, 1, 1, 1, 2, 2],
      Component: Profit,
    },
    {
      colSpan: 1,
      Component: Total,
    },
  ];

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
      {mainInfoItems.map(({ Component, ...props }, index) => (
        <GridItem
          key={index}
          bg={"#e0e0e0"}
          borderRadius={10}
          position={"relative"}
          {...props}
        >
          <Component />
        </GridItem>
      ))}
    </Grid>
  );
};
