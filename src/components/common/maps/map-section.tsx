import { LocationMap } from "./location-map";
import { LocationCard, LocationMarker } from "./location-marker";
import { retrieveLocationPropertiesById } from "@/lib/shared/mapbox";

export async function MapSection({
  locationId,
  locationName,
  image,
}: {
  locationId: string;
  locationName: string;
  image: string;
}) {
  const response = await retrieveLocationPropertiesById(locationId);

  if (!response) return <LocationMap />;

  const {
    coordinates: { latitude, longitude },
    full_address,
    address,
  } = response;

  return (
    <LocationMap longitude={longitude} latitude={latitude}>
      <LocationMarker longitude={longitude} latitude={latitude}>
        <LocationCard
          address={full_address || address}
          name={locationName}
          image={image}
        />
      </LocationMarker>
    </LocationMap>
  );
}
