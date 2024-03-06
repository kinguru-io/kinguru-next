import { Link } from "@/navigation.ts";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

type NavigationLink = {
  href: string;
  name: string;
};

type LinksProps = {
  links: NavigationLink[];
};

export function HeaderLinks({ links }: LinksProps) {
  return (
    <Flex justify="space-evenly" alignItems="center" flexWrap="wrap">
      {links.map(({ href, name }) => (
        <Link
          key={name}
          href={href}
          className={css({
            textAlign: "center",
            textStyle: "body.2",
            padding: "5px",
          })}
        >
          {name}
        </Link>
      ))}
    </Flex>
  );
}
