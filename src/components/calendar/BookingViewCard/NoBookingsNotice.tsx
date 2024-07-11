import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";

export function NoBookingsNotice({ label }: { label: string }) {
  return (
    <Box css={{ color: "secondary" }}>
      <span>{label}</span>
      <Icon
        name="common/cards"
        className={css({
          display: "block",
          paddingBlock: "9",
          marginInline: "auto",
          fontSize: "4rem",
        })}
      />
    </Box>
  );
}
