import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { HStack } from "~/styled-system/jsx";

export function Contacts() {
  return (
    <HStack gap="2">
      <Icon name="common/phone" className={css({ fontSize: "2xl" })} />
      <a
        href="tel:+48792665092"
        className={css({
          fontSize: "lg",
          fontWeight: "bold",
          _hover: { color: "primary" },
        })}
      >
        +48792665092
      </a>
    </HStack>
  );
}
