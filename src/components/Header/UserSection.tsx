import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SignOutButton } from "./SignOutButton";
import { getSession } from "@/auth.ts";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
} from "@/components/uikit";
import avatar from "~/public/img/user.svg";

export async function UserSection() {
  const session = await getSession();
  const t = await getTranslations("navbar");

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        {session ? (
          <Avatar
            name={session.user?.name || ""}
            image={session.user?.image || avatar.src}
          />
        ) : (
          <Button variant="outline" size={"md"}>
            {t("sign_in_and_sign_up")}
          </Button>
        )}
      </DropdownInitiator>
      <DropdownMenu>
        {session ? (
          <>
            <SignOutButton>{t("sign_out")}</SignOutButton>
            <Link href="#">{t("add_organization")}</Link>
          </>
        ) : (
          <>
            <Link href="/auth/signin">{t("sign_in")}</Link>
            <Link href="/auth/organization/signin">{t("sign_in_org")}</Link>
            <Link href="/auth/organization/signup">{t("sign_up")}</Link>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
