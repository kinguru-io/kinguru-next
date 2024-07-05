import { Button, Icon } from "@/components/uikit";
import type { TagVariantProps } from "@/components/uikit/Tag";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";

export function TagClosable({
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
    <HStack
      css={{
        color: "dark",
        gap: "4",
        fontSize: "sm",
        paddingBlockEnd: "2",
        borderColor: "secondary.lighter",
        borderBlockEnd: "1px solid",
      }}
    >
      {content}
      <HStack gap="3" marginInlineStart="auto">
        {helper}
        <Button
          className={css({ padding: "1" })}
          type="button"
          colorPalette="secondary"
          onClick={onClick}
          icon={
            <Icon
              name="action/trash-can"
              className={css({ fontSize: "md", color: "danger" })}
            />
          }
          aria-label={buttonLabel}
          rounded={false}
        />
      </HStack>
    </HStack>
  );
}
