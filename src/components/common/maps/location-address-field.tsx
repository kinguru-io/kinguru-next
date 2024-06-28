import { Icon } from "@/components/uikit";
import { retrieveLocationPropertiesById } from "@/searchBox";

export async function LocationAddressField({
  locationId,
  fallback,
}: {
  locationId: string;
  fallback?: React.ReactNode;
}) {
  const response = await retrieveLocationPropertiesById(locationId);

  if (!response) return <>{fallback}</>;

  const { full_address, address } = response;

  return (
    <>
      <Icon name="common/location-star" />
      <address>{full_address || address}</address>
    </>
  );
}

export function LocationAddressFallback({ label }: { label: string }) {
  return (
    <>
      <Icon name="action/cross" /> {label}
    </>
  );
}
