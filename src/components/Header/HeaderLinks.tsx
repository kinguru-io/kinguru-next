"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "~/styled-system/css";

type navigationLink = {
  href: string;
  name: string;
};

type LinksProps = {
  navigation: Array<navigationLink>;
};

export function Links({ navigation }: LinksProps) {
  const path = usePathname();

  const navigationLinks = navigation.map(({ href, name }) => {
    const textStyle = path?.indexOf(href) !== -1 ? "heading.h4" : "body.2";
    const newHref = path?.indexOf(href) !== -1 ? "" : href;
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

  return <>{navigationLinks}</>;
}
