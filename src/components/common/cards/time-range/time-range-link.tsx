"use client";

import { format, isPast, isToday } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useTransition, type ComponentProps } from "react";
import { FiSearch } from "react-icons/fi";
import {
  parseInitialDatetimeValues,
  prepareDatetimeParam,
} from "./prepare-datetime";
import { SingleDayPicker } from "@/components/common/cards/single-day-picker";
import {
  Button,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
  Select,
} from "@/components/uikit";
import { useRouter } from "@/navigation";
import { Flex, HStack } from "~/styled-system/jsx";
import { input } from "~/styled-system/recipes";
import type { SystemStyleObject } from "~/styled-system/types";

const selectorStyles: SystemStyleObject = {
  gap: "5px",
  flexDirection: "column",
  sm: { gap: "15px", flexDirection: "row", alignItems: "center" },
};

export function TimeRangeLink({
  pathname,
  flushBefore = [],
  name,
}: {
  pathname: `/${string}`;
  flushBefore?: string[];
  name: string;
}) {
  const t = useTranslations("filters.time_range");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const nowDate = new Date();
  const initialParams = parseInitialDatetimeValues({ searchParams, name });
  const [date, setDate] = useState(nowDate);
  const [from, setFrom] = useState(initialParams[0]);
  const [to, setTo] = useState(initialParams[1]);

  const searchBtnClicked = () => {
    const params = new URLSearchParams(searchParams || undefined);
    flushBefore.forEach((param) => params.delete(param));

    // absence of any of these params makes no sense for searching for items including such predicates
    if (from !== "" && to !== "") {
      const datetimeParam = prepareDatetimeParam(
        date,
        Number(from),
        Number(to),
      );
      params.set(name, datetimeParam);
    }

    startTransition(() => router.push(`${pathname}?${params}`));
  };

  const dateFormatted = format(date, "dd.MM.yyyy");
  const buttonCommonProps: ComponentProps<typeof Button> = {
    role: "link",
    type: "button",
    onClick: searchBtnClicked,
    icon: <FiSearch size="1.125em" />,
    isLoading: pending,
  };

  return (
    <HStack
      gap="18px"
      justifyContent="space-between"
      maxWidth="668px"
      layerStyle="outlinePrimaryWrapper"
      borderRadius="full"
      paddingBlock="18px"
      paddingInline="30px"
      sm={{
        gap: "25px",
        "& > .button": { marginInlineStart: "auto" },
      }}
      css={{
        "& > .button": {
          flexShrink: "0",
          _firstOfType: { display: { base: "inline-flex", sm: "none" } },
          _lastOfType: { display: { base: "none", sm: "inline-flex" } },
        },
      }}
    >
      <Dropdown size="auto" anchor="start">
        <DropdownInitiator>
          <Flex css={selectorStyles}>
            {t("date_label")}
            <time className={input()} dateTime={dateFormatted}>
              {dateFormatted}
            </time>
          </Flex>
        </DropdownInitiator>
        <DropdownMenu likeList={false} shouldCloseOnClick={false}>
          <SingleDayPicker
            date={date}
            callback={setDate}
            disabled={(day) => isPast(day) && !isToday(day)}
          />
        </DropdownMenu>
      </Dropdown>
      <TimeSelect
        label={t("from_label")}
        placeholder="09:00"
        value={from}
        callback={setFrom}
      />
      <TimeSelect
        label={t("to_label")}
        placeholder="20:00"
        value={to}
        callback={setTo}
      />
      <Button {...buttonCommonProps} size="iconOnly">
        {t("search_btn_label")}
      </Button>
      <Button {...buttonCommonProps} size="md">
        {t("search_btn_label")}
      </Button>
    </HStack>
  );
}

function TimeSelect({
  label,
  placeholder,
  value,
  callback,
}: {
  label: string;
  placeholder: string;
  value: string;
  callback: (value: string) => unknown;
}) {
  return (
    <Flex css={selectorStyles}>
      {label}
      <Select
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => callback(target.value)}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={i}>
            {String(i).padStart(2, "0")}:00
          </option>
        ))}
      </Select>
    </Flex>
  );
}
