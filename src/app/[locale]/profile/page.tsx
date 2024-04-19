import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { ProfileNotifications } from "@/components/notifications/profile-notifications";
import { ProfileFAQ } from "@/components/profile/profile-faq";
import { Avatar } from "@/components/uikit";
import { Link, redirect } from "@/navigation";
import { Float, Grid, GridItem, InlineBox, VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default async function ProfilePage() {
  const session = await getSession();
  const t = await getTranslations("profile");

  if (!session || !session.user) return redirect("/auth/signin");

  const user = session.user;

  const notifications = await prisma.purchaseNotification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <Grid gap="75px" paddingInline="10%">
      <VStack gap="0">
        <Avatar size="md" name={user.name} image={user.image} />
        <InlineBox textAlign="center" marginBlock="25px" color="neutral.0">
          <h1>{t("user_greeting")}</h1>
          {t("page_tip")}
        </InlineBox>
        <Link
          className={button({ size: "md", variant: "solid" })}
          href="/profile/venues/add"
        >
          {t("add_premise_btn_label")}
        </Link>
      </VStack>
      <Grid gridTemplateColumns="6" gridTemplateRows="3" gap="1.25rem">
        <GridItem
          // * in progress (2nd part)
          layerStyle="outlineSecondaryWrapper"
          gridColumn="1 / 3"
          gridRow="1 / -1"
          backgroundColor="neutral.4"
          borderColor="neutral.2"
          position="relative"
        >
          <WorkInProgress label={t("calendar_label")} />
        </GridItem>

        <ProfileLayoutItem>
          <h3>{t("faq_heading")}</h3>
          <ProfileFAQ />
        </ProfileLayoutItem>
        <ProfileLayoutItem>
          <h3>{t("notifications_heading")}</h3>
          <ProfileNotifications notifications={notifications} />
        </ProfileLayoutItem>

        <GridItem
          // * in progress (2nd part)
          layerStyle="outlineSecondaryWrapper"
          gridColumn="3 / -1"
          backgroundColor="neutral.4"
          borderColor="neutral.2"
          position="relative"
        >
          <WorkInProgress label={t("profile_completeness_label")} />
        </GridItem>
      </Grid>
    </Grid>
  );
}

function ProfileLayoutItem({ children }: { children: React.ReactNode }) {
  return (
    <GridItem
      layerStyle="outlineSecondaryWrapper"
      gridColumn="3 / -1"
      display="flex"
      flexDirection="column"
      gap="15px"
      padding="17px"
      css={{ "& h3": { textStyle: "heading.6" } }}
      position="relative"
    >
      {children}
    </GridItem>
  );
}

function WorkInProgress({ label }: { label: string }) {
  return (
    <Float placement="middle-center" offset="0" transform="none">
      <InlineBox
        position="absolute"
        width="250px"
        textAlign="center"
        textStyle="body.2"
      >
        {label}
      </InlineBox>
    </Float>
  );
}
