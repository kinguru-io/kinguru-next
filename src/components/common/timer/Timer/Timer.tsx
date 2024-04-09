import {
  millisecondsInMinute,
  millisecondsInHour,
  millisecondsInSecond,
} from "date-fns/constants";
import { useCountdown } from "../use-countdown";
import { Box, type BoxProps } from "~/styled-system/jsx";

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
} & BoxProps) {
  const delay = Math.min(
    minutes * millisecondsInMinute,
    millisecondsInHour - millisecondsInSecond, // 3599 seconds = 59:59
  );
  const now = useCountdown({ delay, callback });

  return <Box {...cssProps}>{timeFormatter.format(delay - now)}</Box>;
}
