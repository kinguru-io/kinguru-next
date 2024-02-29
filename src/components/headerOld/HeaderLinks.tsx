"use client";
import { Link } from "@/navigation.ts";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

type NavigationLink = {
  href: string;
  name: string;
};

type LinksProps = {
  navigation: Array<NavigationLink>;
};

export function Links({ navigation }: LinksProps) {
  const navigationLinks = navigation.map(({ href, name }) => {
    return (
      <Link
        key={name}
        href={href}
        className={css({
          textStyle: "body.2",
          padding: "5px",
        })}
      >
        {name}
      </Link>
    );
  });

  return <Flex justify="space-evenly">{navigationLinks}</Flex>;
}
