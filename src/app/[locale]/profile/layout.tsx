import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { GoBackButton } from "@/components/common";
import { ProfileNavigation } from "@/components/profile/profile-navigation";
import { redirect } from "@/navigation";
import { Container, Grid, GridItem } from "~/styled-system/jsx";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const t = await getTranslations("profile");

  if (!session) return redirect("/auth/signin");

  return (
    <Container maxWidth="1920px" paddingInline="0">
      <Grid gap="0" paddingBlock="45px" gridTemplateColumns="272px 1fr">
        <ProfileNavigation />
        <GridItem>
          <GoBackButton
            label={t("go_back_btn_label")}
            display="block"
            marginBlockStart="-25px"
          />
          {children}
        </GridItem>
      </Grid>
    </Container>
  );
}
