import { Filter, FilterGroup } from "./filter";
import { Box } from "~/styled-system/jsx";

export default {
  title: "UIKit/Filters/Filter",
};

export const FilterExample = {
  render: () => {
    return (
      <Box maxWidth="80">
        <Filter heading="All filters">
          <FilterGroup heading="Country">0</FilterGroup>
          <FilterGroup heading="City">1</FilterGroup>
          <FilterGroup heading="Amenities">2</FilterGroup>
          <FilterGroup heading="Time">3</FilterGroup>
          <FilterGroup heading="Date">4</FilterGroup>
        </Filter>
      </Box>
    );
  },
};
