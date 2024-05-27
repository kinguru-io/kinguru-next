"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter } from "@/navigation";
import { Stack } from "~/styled-system/jsx";

export function FilterGroupWrapper({
  shouldReplace = true,
  children,
}: {
  shouldReplace?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // solution was provided to synchronize the search params the first page load
  // basically for keeping away from react props and continuous rerender while changing props
  // * doesn't work as expected
  useEffect(() => {
    if (!searchParams || searchParams.size === 0) return;
    if (!wrapperRef.current) return;

    for (const [name, value] of searchParams.entries()) {
      const input = wrapperRef.current.querySelector<HTMLInputElement>(
        `input[name="${name}"][value="${value}"]`,
      );

      if (input) {
        input.checked = true;
      }
    }
  }, [wrapperRef]);

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
