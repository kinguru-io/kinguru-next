import { ListingPageInner } from "./_widgets/listing-page-inner";

export default function PremiseListingPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  return <ListingPageInner searchParams={searchParams} />;
}
