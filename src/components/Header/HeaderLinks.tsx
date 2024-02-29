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
  navigation: Array<NavigationLink>;
};

export function Links({ navigation }: LinksProps) {
  const selectedSegment = useSelectedLayoutSegment();

  const navigationLinks = navigation.map(({ href, name }) => {
    const textStyle =
      selectedSegment === href.slice(1) ? "heading.h4" : "body.2";
    const newHref = selectedSegment === href.slice(1) ? "" : href;
    return (
      <Link
        key={name}
        href={newHref}
        className={css({
          textStyle: textStyle,
          padding: "5px",
        })}
      >
        {name}
      </Link>
    );
  });

  return <Flex justify="space-evenly">{navigationLinks}</Flex>;
}
