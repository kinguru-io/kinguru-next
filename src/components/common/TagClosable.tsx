import { RxCross1 } from "react-icons/rx";
import { Button, Card, Tag } from "@/components/uikit";
import type { TagVariantProps } from "@/components/uikit/Tag";
import { Divider } from "~/styled-system/jsx";

export function TagClosable({
  variant = "secondaryLighter",
  content,
  helper,
  onClick,
  buttonLabel,
}: {
  onClick: () => void;
  buttonLabel: string;
  variant?: TagVariantProps["variant"];
  content: React.ReactNode;
  helper?: React.ReactNode;
}) {
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
        "& > [data-helper]": { marginInline: "auto" },
      }}
    >
      <Tag size="sm" variant={variant} css={{ flexShrink: "0" }}>
        {content}
      </Tag>
      <span data-helper>{helper}</span>
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
