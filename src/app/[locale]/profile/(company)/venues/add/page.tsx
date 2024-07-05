import { getTranslations } from "next-intl/server";
import { AddVenueForm } from "./form";
import { createVenueAction } from "@/lib/actions/venue";

export default async function AddVenuePage() {
  const t = await getTranslations("profile.venues.add");

  return (
    <>
      <h1 className="main-heading">{t("heading")}</h1>
      <AddVenueForm createVenue={createVenueAction} />
    </>
  );
}
