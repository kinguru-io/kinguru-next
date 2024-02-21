import Link from "next/link";
import { getServerSession } from "next-auth";
import { Avatar } from "../uikit";
import { Button } from "../uikit/Button";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";

type UserSectionProps = {
  t: any;
};
export async function UserSection({ t }: UserSectionProps) {
  const session = await getServerSession();
  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        {session ? (
          <Avatar name="avatar" image={session.user?.image!} />
        ) : (
          <Button variant="outline" size={"md"}>
            {t("sign_in_and_sign_up")}
          </Button>
        )}
      </DropdownInitiator>
      <DropdownMenu>
        {session ? (
          <>
            <Link href="#">{t("sign_out")}</Link>
            <Link href="#">{t("add_organization")}</Link>
          </>
        ) : (
          <>
            <Link href="#">{t("sign_in")}</Link>
            <Link href="#">{t("sign_up")}</Link>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
