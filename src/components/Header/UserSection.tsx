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
import { Link } from "@/navigation";
import { HStack, InlineBox } from "~/styled-system/jsx";

export async function UserSection() {
  const session = await getSession();
  const t = await getTranslations("navbar");

  const name = session?.user?.name;
  const image = session?.user?.image;

  return (
    <Dropdown size="lg">
      <DropdownInitiator>
        {session ? (
          <HStack gap="2">
            <Avatar name={name} image={image} size={{ base: "xs", md: "md" }} />
            {name && (
              <InlineBox
                fontSize="xs"
                maxWidth="75px"
                display={{ base: "none", sm: "initial" }}
                truncate
              >
                {name}
              </InlineBox>
            )}
          </HStack>
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
