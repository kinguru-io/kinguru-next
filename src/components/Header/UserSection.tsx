import Link from "next/link";
import { getServerSession } from "next-auth";
import { Avatar } from "../uikit";
import { Button } from "../uikit/Button";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";

export async function UserSection() {
  const session = await getServerSession();

  return (
    <Dropdown size={"lg"}>
      <DropdownInitiator>
        {session ? (
          <Avatar name="avatar" image={session.user?.image!} />
        ) : (
          <Button variant="outline" size={"md"}>
            Вход и регистрация
          </Button>
        )}
      </DropdownInitiator>
      <DropdownMenu>
        {session ? (
          <>
            <Link href="#">Выйти</Link>
            <Link href="#">Добавить кабинет организации</Link>
          </>
        ) : (
          <>
            <Link href="#">Вход</Link>
            <Link href="#">Регистрация</Link>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
