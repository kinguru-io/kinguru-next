"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Fragment } from "react";
import { ArrowIcon } from "@/components/uikit";
import { Link } from "@/navigation";
import { HStack } from "~/styled-system/jsx";

// TODO add translations (or add manual breadcrumb initialization?)

/**
 * @param {string} rootPath - The root path for the breadcrumbs. Should not contain a leading slash and an end slash
 */
export function Breadcrumbs({ rootPath = "" }: { rootPath?: string }) {
  const segments = useSelectedLayoutSegments();

  if (!segments || segments.length < 2) return null;

  const mainHref = rootPath ? `/${rootPath}/` : "/";

  return (
    <HStack
      gap="10px"
      marginBlock="-25px 50px"
      css={{ "& > a": { textStyle: "heading.5" } }}
    >
      {segments.map((segment, idx) => {
        const href = segments.slice(0, idx + 1).join("/");
        const isBeforeLast = idx !== segments.length - 1;

        return (
          <Fragment key={segment}>
            <Link href={`${mainHref}${href}`}>{segment}</Link>
            {isBeforeLast && <ArrowIcon direction="right" />}
          </Fragment>
        );
      })}
    </HStack>
  );
}
