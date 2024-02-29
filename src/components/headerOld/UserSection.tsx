import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Avatar } from "../uikit";
import { Button } from "../uikit/Button";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";

import avatar from "~/public/img/user.svg";
import { css } from "~/styled-system/css";

export function UserSection() {
  const { data: session } = useSession();
  const t = useTranslations("navbar");

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        {session ? (
          <Avatar
            name={session.user?.name || "avatar"}
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
            <div
              className={css({ cursor: "pointer" })}
              onClick={() => signOut()}
            >
              {t("sign_out")}
            </div>
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
