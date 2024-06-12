import { getTranslations } from "next-intl/server";
import { EditUserProfileForm } from "./form";
import { getSession } from "@/auth";
import { ProfileSectionLayout } from "@/layout/page";
import { updateUserProfile } from "@/lib/actions";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";
import { Container } from "~/styled-system/jsx";

export default async function Uikit() {
  const session = await getSession();

  if (!session || session.user?.role !== "user") {
    return (
      <Container paddingBlock="5rem">
        The showcase only for a user role. Log in as a user.
      </Container>
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user?.id || "" },
    include: { socialLinks: { select: { network: true, url: true } } },
  });

  if (!user) {
    return redirect("/auth/signin");
  }

  const t = await getTranslations("user.basic_info_page");

  return (
    <Container paddingBlock="5rem">
      <ProfileSectionLayout>
        <h1 className="heading">{t("heading")}</h1>
        <section>
          <EditUserProfileForm
            userData={user}
            updateProfile={updateUserProfile}
          />
        </section>
      </ProfileSectionLayout>
    </Container>
  );
}
