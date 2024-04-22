import { getSession } from "@/auth";
import { ProfileNavigation } from "@/components/profile/profile-navigation";
import { redirect } from "@/navigation";
import { Container, Grid, GridItem } from "~/styled-system/jsx";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) return redirect("/auth/signin");

  return (
    <Container maxWidth="1920px" paddingInline="0">
      <Grid gap="0" paddingBlock="70px" gridTemplateColumns="272px 1fr">
        <ProfileNavigation />
        <GridItem>
          {/*<Breadcrumbs rootPath="profile" />*/}
          {children}
        </GridItem>
      </Grid>
    </Container>
  );
}
