"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter } from "@/navigation";
import { Stack } from "~/styled-system/jsx";

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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!searchParams) return;
    if (!wrapperRef.current) return;

    const inputs =
      wrapperRef.current.querySelectorAll<HTMLInputElement>("input");

    inputs.forEach((input) => {
      input.checked = searchParams.has(input.name, input.value);
    });
  }, [wrapperRef, searchParams]);

  const updateGroupedSearchParams = useDebouncedCallback(
    (name: string, value: string, checked: boolean) => {
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
    },
    300,
  );

  const innerInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    updateGroupedSearchParams(name, value, checked);
  };

  return (
    <Stack ref={wrapperRef} gap="8px" onChangeCapture={innerInputChanged}>
      {children}
    </Stack>
  );
}
