import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { SubSection } from "@/components/common/cards/sub-section";
import { ProfileNotifications } from "@/components/notifications/profile-notifications";
import { Stack } from "~/styled-system/jsx";

export default async function NotificationsPage() {
  const t = await getTranslations("profile.notifications");
  const session = await getSession();
  const notifications = await prisma.purchaseNotification.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <SubSection>
      <h1 className="title">{t("heading")}</h1>
      <Stack gap="2">
        <ProfileNotifications notifications={notifications} />
      </Stack>
    </SubSection>
  );
}
