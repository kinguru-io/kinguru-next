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
  links: NavigationLink[];
};

export function HeaderLinks({ links }: LinksProps) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <Flex flexWrap="wrap" gap="3" flexGrow="1">
      {links.map(({ href, name }) => (
        <Link
          key={name}
          href={href}
          className={css({
            fontWeight: "bold",
            textAlign: "center",
            padding: "2",
            _hover: { color: "primary" },
            _selected: { color: "primary" },
          })}
          aria-selected={selectedSegment === href.slice(1)}
        >
          {name}
        </Link>
      ))}
    </Flex>
  );
}
