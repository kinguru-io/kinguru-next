"use client";

import { TicketIntentStatus } from "@prisma/client";
import { formatISO } from "date-fns";
import { useRef, useTransition } from "react";
import { SingleDayPicker } from "@/components/common/cards/single-day-picker";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemToggle,
  Button,
  Input,
  Select,
} from "@/components/uikit";
import { Link, useRouter } from "@/navigation";
import { HStack, Stack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

const statusAll = "__all__";

export function SlotsSearch() {
  const emailRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef("");
  const statusRef = useRef("");
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const searchClicked = () => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      searchParams.append("email", emailRef.current?.value || "");
      searchParams.append("date", dateRef.current);
      searchParams.append("status", statusRef.current);

      router.push(`?${searchParams.toString()}`);
    });
  };

  return (
    <Stack gap="2" marginBlockEnd="10">
      <Input ref={emailRef} inputMode="email" placeholder="User email" />
      <AccordionItem>
        <AccordionItemToggle fontSize="px15" color="secondary" paddingBlock="4">
          Date
        </AccordionItemToggle>
        <AccordionItemContent>
          <SingleDayPicker
            date={new Date(`${dateRef.current}T00:00:00Z`)}
            callback={(day) => {
              dateRef.current = formatISO(day, { representation: "date" });
            }}
            captionLayout="dropdown"
          />
        </AccordionItemContent>
      </AccordionItem>
      <Select
        placeholder="Status"
        onChange={({ target }) => {
          statusRef.current = target.value.replace(statusAll, "");
        }}
      >
        <option value={statusAll}>all</option>
        {Object.keys(TicketIntentStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
      <HStack gap="2" justifyContent="space-between" marginBlockStart="2">
        <Button rounded={false} onClick={searchClicked} isLoading={pending}>
          Search
        </Button>
        <Link
          className={button({ colorPalette: "dark", rounded: false })}
          href="/profile/admin"
          prefetch={false}
          replace
        >
          Reset
        </Link>
      </HStack>
    </Stack>
  );
}
