import {
  TimeRangeHero,
  TimeRangeLink,
} from "@/components/common/cards/time-range";

export default function PremiseListingLayout({
  children,
}: {
  children: React.ReactNode;
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
      {children}
    </>
  );
}
