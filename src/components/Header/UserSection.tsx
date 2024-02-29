import Link from "next/link";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { Avatar } from "../uikit";
import { Button } from "../uikit/Button";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";
import { SignOutButton } from "@/components/Header/SignOutButton.tsx";
import { adapterOptions } from "@/lib/nextauth";
import avatar from "~/public/img/user.svg";

export async function UserSection() {
  const session = await getServerSession(adapterOptions);
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
