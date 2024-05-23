import { Filter, FilterItem } from "./filter";
import { Box } from "~/styled-system/jsx";

export default {
  title: "UIKit/Filters/Filter",
};

export const FilterExample = {
  render: () => {
    return (
      <Box maxWidth="284px">
        <Filter heading="All filters">
          <FilterItem heading="Country">0</FilterItem>
          <FilterItem heading="City">1</FilterItem>
          <FilterItem heading="Amenities">2</FilterItem>
          <FilterItem heading="Time">3</FilterItem>
          <FilterItem heading="Date">4</FilterItem>
        </Filter>
      </Box>
    );
  },
};
