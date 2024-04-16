import { getTranslations } from "next-intl/server";
import { OrganizationRegisterForm } from "./form";
import { getSession } from "@/auth.ts";
import { ProfileSectionLayout } from "@/layout/page";
import { orgRegister } from "@/lib/actions";
import { redirect } from "@/navigation.ts";

// TODO seems should be moved to /profile/venues/edit ???

export default async function OrganizationRegisterPage() {
  const t = await getTranslations("organization.basic_info_page");
  const session = await getSession();
  if (session?.user?.role !== "organization") {
    redirect("/");
  }

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <OrganizationRegisterForm orgRegister={orgRegister} />
      </section>
    </ProfileSectionLayout>
  );
}
