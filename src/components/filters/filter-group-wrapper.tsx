"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "@/navigation";
import { css } from "~/styled-system/css";

export function FilterGroupWrapper({
  shouldReplace = false,
  children,
}: {
  shouldReplace?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLFieldSetElement | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!searchParams) return;
    if (!wrapperRef.current) return;

    const inputs =
      wrapperRef.current.querySelectorAll<HTMLInputElement>("input");

    inputs.forEach((input) => {
      input.checked = searchParams.has(input.name, input.value);
    });
  }, [wrapperRef]);

  const updateGroupedSearchParams = (
    name: string,
    value: string,
    checked: boolean,
  ) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams);

    switch (true) {
      case shouldReplace: {
        params.set(name, value);
        break;
      }
      case params.has(name, value) && !checked: {
        params.delete(name, value);
        break;
      }
      case !params.has(name, value) && checked: {
        params.append(name, value);
        break;
      }
      default:
    }

    // resetting size in case any of filter aggs was changed
    params.delete("size");
    router.push(`${pathname}?${params}`, { scroll: false });
  };

  const innerInputChanged = ({
    target,
  }: React.FormEvent<HTMLFieldSetElement>) => {
    if (isInputTarget(target)) {
      const { name, value, checked } = target;
      startTransition(() => updateGroupedSearchParams(name, value, checked));
    }
  };

  return (
    <fieldset
      className={css({ display: "flex", flexDirection: "column", gap: "8px" })}
      ref={wrapperRef}
      onChangeCapture={innerInputChanged}
      disabled={pending}
    >
      {children}
    </fieldset>
  );
}

function isInputTarget(target: EventTarget): target is HTMLInputElement {
  return "value" in target && "checked" in target;
}
