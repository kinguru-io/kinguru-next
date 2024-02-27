import Link from "next/link";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { Avatar } from "../uikit";
import { Button } from "../uikit/Button";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";

export async function UserSection() {
  const session = await getServerSession();
  const t = await getTranslations("navbar");

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        {session ? (
          <Avatar
            name={session.user?.name || ""}
            image={session.user?.image || ""}
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
            <Link href="">{t("sign_out")}</Link>
            <Link href="">{t("add_organization")}</Link>
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
