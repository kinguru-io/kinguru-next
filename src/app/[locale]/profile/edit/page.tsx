import { getTranslations } from "next-intl/server";
import { EditProfileForm } from "./form";
import { getSession } from "@/auth.ts";
import { ProfileSectionLayout } from "@/layout/page";
import { orgRegister } from "@/lib/actions";
import { redirect } from "@/navigation.ts";

export default async function EditProfilePage() {
  const t = await getTranslations("organization.basic_info_page");
  const session = await getSession();
  if (session?.user?.role !== "organization") {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { company: true },
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <EditProfileForm
          companyName={user.company || ""}
          orgRegister={orgRegister}
        />
      </section>
    </ProfileSectionLayout>
  );
}
