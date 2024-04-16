import { getTranslations } from "next-intl/server";
import { AddVenueForm } from "./form";
import { ProfileSectionLayout } from "@/layout/page";

export default async function AddVenuePage() {
  const t = await getTranslations("profile.venues.add");

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <AddVenueForm />
      </section>
    </ProfileSectionLayout>
  );
}
