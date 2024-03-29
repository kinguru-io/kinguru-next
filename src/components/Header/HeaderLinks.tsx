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
    <Flex justify="space-evenly" alignItems="center" flexWrap="wrap">
      {links.map(({ href, name }) => (
        <Link
          key={name}
          href={href}
          className={css({
            textAlign: "center",
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
