import { getTranslations } from "next-intl/server";
import { SignOutButton } from "./sign-out-button";
import { getSession } from "@/auth.ts";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
  Icon,
} from "@/components/uikit";
import { Link } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import { HStack, InlineBox } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export async function UserSection() {
  const session = await getSession();
  const t = await getTranslations("navbar");

  if (!session) {
    return (
      <>
        <Link
          href="/auth/signin"
          className={css({
            mdDown: { display: "none" },
            _hoverOrFocusVisible: { textDecoration: "underline" },
          })}
        >
          {t("sign_in")}
        </Link>
        <Link
          href="/auth/signup/company"
          className={cx(button(), css({ mdDown: { display: "none" } }))}
        >
          {t("add_venue")}
        </Link>
        <Link
          href="/auth/signin"
          className={css({
            display: "flex",
            gap: "1.5",
            alignItems: "center",
            fontSize: "sm",
            md: { display: "none" },
            "& > svg": { fontSize: "2xl" },
          })}
        >
          <Icon name="common/user-circle" />
          {t("sign_in")}
        </Link>
      </>
    );
  }

  const name = session.user?.organizations.at(0)?.name || session.user?.name;
  const image = session.user?.image;

  return (
    <Dropdown size="auto">
      <DropdownInitiator>
        <HStack className="group" css={{ gap: "2" }}>
          <Avatar name={name} image={image} size={{ base: "xs", md: "md" }} />
          {name && (
            <InlineBox
              fontSize="xs"
              maxWidth={{ base: "16", md: "20" }}
              _groupHover={{ textDecoration: "underline" }}
              truncate
            >
              {name}
            </InlineBox>
          )}
        </HStack>
      </DropdownInitiator>
      <DropdownMenu>
        <Link href="/profile">{t("your_profile")}</Link>
        <Link href="/profile/mybookings">{t("mybookings")}</Link>
        <SignOutButton className={css({ textAlign: "start" })}>
          {t("sign_out")}
        </SignOutButton>
      </DropdownMenu>
    </Dropdown>
  );
}

export function UserSectionSkeleton({ label }: { label: string }) {
  return (
    <Button
      colorPalette="secondary"
      className={css({ padding: { mdDown: "2.5" } })}
      isLoading
    >
      {label}
    </Button>
  );
}
