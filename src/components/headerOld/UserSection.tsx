import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { SignOutButton } from "@/components/Header/SignOutButton";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
} from "@/components/uikit";
import { Link } from "@/navigation";

export function UserSection() {
  const { data: session } = useSession();
  const t = useTranslations("navbar");

  return (
    <Dropdown size="lg">
      <DropdownInitiator>
        {session ? (
          <Avatar name={session.user?.name} image={session.user?.image} />
        ) : (
          <Button>{t("sign_in_and_sign_up")}</Button>
        )}
      </DropdownInitiator>
      <DropdownMenu>
        {session ? (
          <>
            <Link href="/profile">{t("your_profile")}</Link>
            {/* {session.user?.role === "organization" && (
              <Link href="/profile/edit">{t("add_organization")}</Link>
            )} */}
            <SignOutButton>{t("sign_out")}</SignOutButton>
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
