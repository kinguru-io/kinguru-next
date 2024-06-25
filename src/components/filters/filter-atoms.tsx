"use client";

import { useSearchParams } from "next/navigation";
import type { ComponentProps } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Checkbox, Input, Radio } from "@/components/uikit";
import { usePathname, useRouter } from "@/navigation";
import { HStack } from "~/styled-system/jsx";

const numericRegex = /^\d+\.?\d*$/m;

export function RangeItem({
  min,
  max,
  fieldName,
  fromLabel,
  toLabel,
}: {
  min: number;
  max: number;
  fieldName: string;
  fromLabel: string;
  toLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const commonProps: ComponentProps<typeof Input> = {
    type: "text",
    inputMode: "numeric",
    textCentered: true,
    onInput: ({ currentTarget }) => {
      const newValue = currentTarget.value;
      if (numericRegex.test(newValue)) return;

      currentTarget.value = newValue.slice(0, -1);
    },
  };

  const updateRangeSearchParams = useDebouncedCallback(
    (value: string, edge: "from" | "to") => {
      if (!searchParams) return;
      const params = new URLSearchParams(searchParams);

      const currentState = params.get(fieldName);
      const [from, to] = currentState ? currentState.split("-") : [min, max];
      const newState =
        edge === "to" ? `${from}-${value || max}` : `${value || min}-${to}`;

      params.set(fieldName, newState);
      // resetting size in case any of filter aggs was changed
      params.delete("size");
      router.push(`${pathname}?${params}`, { scroll: false });
    },
    300,
    {
      trailing: true,
    },
  );

  const currentState = searchParams?.get(fieldName);
  const [from, to] = currentState ? currentState.split("-") : [];

  return (
    <HStack gap="2">
      <Input
        name={`from_${fieldName}`}
        placeholder={`${fromLabel} ${String(min)}`}
        defaultValue={from}
        onChange={(e) => updateRangeSearchParams(e.target.value, "from")}
        {...commonProps}
      />
      <Input
        name={`to_${fieldName}`}
        placeholder={`${toLabel} ${String(max)}`}
        defaultValue={to}
        onChange={(e) => updateRangeSearchParams(e.target.value, "to")}
        {...commonProps}
      />
    </HStack>
  );
}

export function TermsItem({
  termName,
  inputName,
  label,
  isRadio,
}: {
  termName: string;
  inputName: string;
  label: string;
  isRadio: boolean;
}) {
  const commonProps = {
    label,
    name: termName,
    value: inputName,
  };

  if (isRadio) return <Radio {...commonProps} />;

  return <Checkbox {...commonProps} />;
}
