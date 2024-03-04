"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Link } from "@/navigation.ts";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

type NavigationLink = {
  href: string;
  name: string;
};

type LinksProps = {
  navigation: NavigationLink[];
};

export function Links({ navigation }: LinksProps) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <Flex justify="space-evenly">
      {navigation.map(({ href, name }) => (
        <Link
          key={name}
          href={href}
          className={css({
            textStyle:
              selectedSegment === href.slice(1) ? "heading.4" : "body.2",
            padding: "5px",
          })}
        >
          {name}
        </Link>
      ))}
    </Flex>
  );
}
