import { getTranslations } from "next-intl/server";
import { ProfileMenuModal } from "./_menu-client-entry";
import { getSession } from "@/auth";
import { GoBackButton } from "@/components/common";
import { ProfileNavigation } from "@/components/profile/profile-navigation";
import { Button, Icon, Loader } from "@/components/uikit";
import { Link, redirect } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { Box, Container, GridItem, Stack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const t = await getTranslations("profile");

  if (!session) return redirect("/auth/signin");

  return (
    <Box bgColor="neutral.1" height="full">
      <Container
        css={{
          display: "grid",
          gridTemplateColumns: "1fr",
          paddingBlock: "6",
          md: {
            gap: "7",
            gridTemplateColumns: "19rem 1fr",
            paddingBlock: "10",
          },
        }}
      >
        <ProfileMenuModal fallback={<MenuSkeleton />}>
          <Stack
            css={{
              gap: "6",
              height: "full",
              justifyContent: "space-between",
              md: {
                height: "fit-content",
                justifyContent: "flex-start",
                position: "sticky",
                top: "0",
              },
            }}
          >
            <ProfileNavigation menuLabel={t("menu.menu_label")} />
            {session.user?.role === "user" && (
              <FindPremiseLink label={t("menu.find_premise_label")} />
            )}
          </Stack>
        </ProfileMenuModal>
        <GridItem minHeight="30vh">
          <GoBackButton label={t("go_back_btn_label")} display="block" />
          {children}
        </GridItem>
      </Container>
    </Box>
  );
}

function MenuSkeleton() {
  return (
    <div
      className={css({
        "& > :first-child": {
          position: "fixed",
          bottom: "0",
          insetInline: "0",
          zIndex: "1",
          paddingBlock: "3",
          opacity: "0.9",
          md: { display: "none" },
        },
        "& > :last-child": { height: "80", mdDown: { display: "none" } },
      })}
      aria-busy
    >
      <Button
        colorPalette="secondary"
        icon={<Icon name="action/menu" className={css({ fontSize: "xl" })} />}
        isLoading
      >
        ...
      </Button>
      <Loader />
    </div>
  );
}

function FindPremiseLink({ label }: { label: string }) {
  return (
    <Link
      href="/premises"
      className={cx(
        button({ rounded: false }),
        css({
          marginInline: "4",
          bgColor: "success",
          color: "light",
          justifyContent: "center",
          _hoverOrFocusVisible: { bgColor: "success.darker" },
        }),
      )}
    >
      {label}
    </Link>
  );
}
