import Link from "next/link";
import { getServerSession } from "next-auth";
import { Avatar } from "../uikit";
import { Button } from "../uikit/Button";
import { Dropdown, DropdownInitiator, DropdownMenu } from "../uikit/Dropdown";

export async function UserSection() {
  const session = await getServerSession();

  return (
    <>
      {session ? (
        <Dropdown size={"lg"}>
          <DropdownInitiator>
            <Avatar name="avatar" image={session.user?.image!} />
          </DropdownInitiator>
          <DropdownMenu>
            <Link href="#">Выйти</Link>
            <Link href="#">Добавить кабинет организации</Link>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown size={"lg"}>
          <DropdownInitiator>
            <Button variant="outline">Вход и регистрация</Button>
          </DropdownInitiator>
          <DropdownMenu>
            <Link href="#">Вход</Link>
            <Link href="#">Регистрация</Link>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}
