import { addHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { RxCross1 } from "react-icons/rx";
import { Button, Card, Tag, type TimeSlotInfo } from "@/components/uikit";
import type { TagVariantProps } from "@/components/uikit/Tag";
import { priceFormatter } from "@/lib/utils";
import { Divider } from "~/styled-system/jsx";

type TimeSlotCardProps = TimeSlotInfo & {
  endTime?: Date;
  timeZone?: string;
  onClick: () => void;
  buttonLabel: string;
  variant?: TagVariantProps["variant"];
};

export function TimeSlotCard({
  time,
  endTime = addHours(time, 1),
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  price,
  onClick,
  buttonLabel,
  variant = "secondaryLighter",
}: TimeSlotCardProps) {
  return (
    <Card
      flexShrink="0"
      border="1px solid"
      borderColor="neutral.2"
      padding="6px 5px"
      alignItems="center"
      textStyle="body.2"
      css={{
        "& > .button": { fontSize: "9px" },
        "& > [data-price]": { marginInline: "auto" },
      }}
    >
      <Tag size="sm" variant={variant} css={{ flexShrink: "0" }}>
        {`${formatInTimeZone(time, timeZone, "H:mm")} - ${formatInTimeZone(endTime, timeZone, "H:mm")}`}
      </Tag>
      <span data-price>{priceFormatter.format(price)}</span>
      <Divider orientation="vertical" color="neutral.2" borderStyle="dashed" />
      <Button
        variant="ghost"
        size="iconOnly"
        onClick={onClick}
        icon={<RxCross1 size="10px" />}
      >
        {buttonLabel}
      </Button>
    </Card>
  );
}
