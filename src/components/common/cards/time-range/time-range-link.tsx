"use client";

import { format, isPast, isToday } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import type { Matcher } from "react-day-picker";
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
  Icon,
  Input,
  Select,
} from "@/components/uikit";
import { useRouter } from "@/navigation";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

const timeSearchDayMatcher: Matcher = (day) => isPast(day) && !isToday(day);

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

  const initialParams = parseInitialDatetimeValues({ searchParams, name });
  const [date, setDate] = useState<Date | null>(null);
  const [from, setFrom] = useState(initialParams[0]);
  const [to, setTo] = useState(initialParams[1]);

  const searchBtnClicked = () => {
    const params = new URLSearchParams(searchParams || undefined);
    flushBefore.forEach((param) => params.delete(param));

    // absence any of these params makes no sense looking for items including such predicates
    if (from !== "" && to !== "") {
      const datetimeParam = prepareDatetimeParam(
        date || new Date(),
        Number(from),
        Number(to),
      );
      params.set(name, datetimeParam);
    }

    startTransition(() => router.push(`${pathname}?${params}`));
  };

  return (
    <Flex
      flexDirection="column"
      gap="2"
      justifyContent="space-between"
      md={{
        flexDirection: "row",
        padding: "4",
        bgColor: "neutral.5",
        borderRadius: "full",
        "& > :first-child": { flexBasis: "full" }, // stretch dropdown fully
      }}
    >
      <Dropdown size="auto" anchor="start">
        <DropdownInitiator>
          <Input
            type="text"
            value={date ? format(date, "dd.MM.yyyy") : ""}
            placeholder={t("date_label")}
            className={css({ pointerEvents: "none" })}
            prefix={
              <Icon
                name="common/calendar"
                className={css({ fontSize: "2xl" })}
              />
            }
            readOnly
            rounded
          />
        </DropdownInitiator>
        <DropdownMenu likeList={false} shouldCloseOnClick={false}>
          <SingleDayPicker
            date={date || new Date()}
            callback={setDate}
            disabled={timeSearchDayMatcher}
          />
        </DropdownMenu>
      </Dropdown>
      <TimeSelect
        placeholder={t("from_label")}
        value={from}
        callback={setFrom}
      />
      <TimeSelect placeholder={t("to_label")} value={to} callback={setTo} />
      <Button
        role="link"
        type="button"
        onClick={searchBtnClicked}
        icon={<Icon name="common/search" className={css({ fontSize: "xl" })} />}
        isLoading={pending}
        className={css({
          justifyContent: "center",
          flexShrink: "0",
          marginBlockStart: { base: "2", md: "0" },
        })}
      >
        {t("search_btn_label")}
      </Button>
    </Flex>
  );
}

function TimeSelect({
  placeholder,
  value,
  callback,
}: {
  placeholder: string;
  value: string;
  callback: (value: string) => unknown;
}) {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={({ target }) => callback(target.value)}
      icon={<Icon name="common/time" />}
      rounded
    >
      {Array.from({ length: 24 }, (_, i) => (
        <option key={i} value={i}>
          {String(i).padStart(2, "0")}:00
        </option>
      ))}
    </Select>
  );
}
