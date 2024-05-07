import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { ProfileNotifications } from "@/components/notifications/profile-notifications";
import { ProfileSectionLayout } from "@/layout/page";
import { Stack } from "~/styled-system/jsx";

export default async function NotificationsPage() {
  const t = await getTranslations("profile.notifications");
  const session = await getSession();
  const notifications = await prisma.purchaseNotification.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <Stack gap="10px">
          <ProfileNotifications notifications={notifications} />
        </Stack>
      </section>
    </ProfileSectionLayout>
  );
}
