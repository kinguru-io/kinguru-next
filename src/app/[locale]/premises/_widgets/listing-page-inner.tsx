import { Suspense } from "react";

import { FilterModal } from "./filter-entry";
import { FilterSkeleton } from "./filter-skeleton";
import { Listing } from "./listing";
import { ListingSkeletons } from "./listing-skeletons";
import { PremiseFilter } from "./premise-filter";
import { defaultSizings } from "@/lib/actions/premise-filter";
import { Container, Grid } from "~/styled-system/jsx";

export function ListingPageInner({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  return (
    <Container>
      <Grid
        gap="4"
        paddingBlockStart="4"
        paddingBlockEnd="8"
        gridTemplateColumns="1fr"
        md={{
          gap: "16",
          paddingBlockStart: "8",
          paddingBlockEnd: "13",
          gridTemplateColumns: "{spacing.72} 1fr",
        }}
      >
        <FilterModal fallback={<FilterSkeleton />}>
          <PremiseFilter />
        </FilterModal>
        <Suspense
          key={Object.values(searchParams).join()}
          fallback={
            <ListingSkeletons
              size={Number(searchParams?.size) || defaultSizings.size}
            />
          }
        >
          <Listing searchParams={searchParams} />
        </Suspense>
      </Grid>
    </Container>
  );
}
