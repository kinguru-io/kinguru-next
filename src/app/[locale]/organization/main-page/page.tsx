import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { Avatar, Button } from "@/components/uikit";
import { OrganizationWelcomeLayout } from "@/layout/block/organization-profile/main-page/OrganizationWelcomeLayout";
import { css } from "~/styled-system/css";
import { Box, VStack } from "~/styled-system/jsx";

export default async function OrganizationProfileMainPage() {
  const session = await getSession();
  const t = await getTranslations("organization.main_page");

  if (!session || !session.user) return notFound();
  //if (session.user.role !== "organization") return notFound();

  const { image, name } = session.user;
  return (
    <Box paddingBlock="70px 108px">
      <OrganizationWelcomeLayout>
        <Avatar size="md" image={image || ""} name={name || ""} />
        <VStack gap="0">
          <h1>{t("hello")}</h1>
          <span className={css({ textStyle: "body.1" })}>
            {t("collected_all_important_things")}
          </span>
        </VStack>
        <Button size="md">{t("add_venue")}</Button>
      </OrganizationWelcomeLayout>
    </Box>
  );
}
