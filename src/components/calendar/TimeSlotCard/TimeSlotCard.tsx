import { addHours, lightFormat } from "date-fns";
import { RxCross1 } from "react-icons/rx";
import { Button, Card, Tag, type TimeSlotInfo } from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { Divider } from "~/styled-system/jsx";

type TimeSlotCardProps = TimeSlotInfo & {
  onClick: () => void;
  buttonLabel: string;
};

export function TimeSlotCard({
  time,
  price,
  onClick,
  buttonLabel,
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
      <Tag size="sm" variant="secondaryLighter" css={{ flexShrink: "0" }}>
        {`${lightFormat(time, "H:mm")} - ${lightFormat(addHours(time, 1), "H:mm")}`}
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
