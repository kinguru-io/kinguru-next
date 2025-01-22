import { ListingPageInner } from "../_widgets/listing-page-inner";
import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";
import {
  premiseTypes,
  type PremiseType,
} from "@/lib/shared/config/premise-types";
import { redirect } from "@/navigation";

export default function PremiseByTypeListingPage({
  params: { type },
  searchParams,
}: {
  searchParams: Record<string, any>;
  params: { type: string };
}) {
  if (!premiseTypes.includes(type as PremiseType)) return redirect("/premises");

  const searchWithType = new URLSearchParams(searchParams);
  searchWithType.append("type", type);

  return (
    <>
      <TimeRangeHero>
        <TimeRangeLink
          pathname="/premises"
          flushBefore={["sort", "size"]}
          name="search_datetime"
        />
      </TimeRangeHero>
      <ListingPageInner searchParams={Object.fromEntries(searchWithType)} />
    </>
  );
}
