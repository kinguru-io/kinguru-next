import { ListingPageInner } from "./_widgets/listing-page-inner";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";

export default function PremiseListingPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  return (
    <>
      <TimeRangeHero>
        <TimeRangeLink
          pathname="/premises"
          flushBefore={["sort", "size"]}
          name="search_datetime"
        />
      </TimeRangeHero>
      <ListingPageInner searchParams={searchParams} />
    </>
  );
}
