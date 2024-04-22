import { getTranslations } from "next-intl/server";
import { AddVenueForm } from "./form.tsx";
import { ProfileSectionLayout } from "@/layout/page";
import { createVenueAction } from "@/lib/actions/venue";

export default async function AddVenuePage() {
  const t = await getTranslations("profile.venues.add");

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <AddVenueForm createVenue={createVenueAction} />
      </section>
    </ProfileSectionLayout>
  );
}
