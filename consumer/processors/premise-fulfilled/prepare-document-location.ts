export async function prepareDocumentLocation({}: { mapboxId: string }) {
  return {
    "location.countryCode": "PL",
    "location.city": "Warsaw",
    "location.timeZone": "Europe/Warsaw",
    "location.latitude": 52.237049,
    "location.longitude": 21.017532,
  };

  // ! do not forget to uncomment when using the mapbox service
  // const mapboxResponse = await searchBox.retrieve(
  //   {
  //     mapbox_id: mapboxId,
  //   } as SearchBoxSuggestion,
  //   {
  //     sessionToken: "test-123",
  //   },
  // );
  // const locationProperties = mapboxResponse.features.at(0)?.properties;
  // const locationContext = locationProperties?.context || {};
  // const longitude = locationProperties?.coordinates.longitude;
  // const latitude = locationProperties?.coordinates.latitude;
  // const tileQueryInstance = await fetch(
  //   `https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${longitude},${latitude}.json?access_token=${searchBox.accessToken}`,
  // );
  // const responseJson: { features: Array<{ properties: { TZID: string } }> } =
  //   await tileQueryInstance.json();
  // return {
  //   "location.countryCode": locationContext.country?.country_code,
  //   "location.city": locationContext.place?.name,
  //   "location.timeZone": responseJson.features[0].properties.TZID,
  //   "location.longitude": longitude,
  //   "location.latitude": latitude,
  // };
}
