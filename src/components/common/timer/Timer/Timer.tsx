import {
  millisecondsInMinute,
  millisecondsInHour,
  millisecondsInSecond,
} from "date-fns/constants";
import { useCountdown } from "../use-countdown";
import { InlineBox, type InlineBoxProps } from "~/styled-system/jsx";

const timeFormatter = new Intl.DateTimeFormat("default", {
  minute: "numeric",
  second: "numeric",
});

export function Timer({
  minutes,
  callback,
  ...cssProps
}: {
  minutes: number;
  callback: () => void;
} & InlineBoxProps) {
  const delay = Math.min(
    minutes * millisecondsInMinute,
    millisecondsInHour - millisecondsInSecond, // 3599 seconds = 59:59
  );
  const now = useCountdown({ delay, callback });

  return (
    <InlineBox {...cssProps}>{timeFormatter.format(delay - now)}</InlineBox>
  );
}
