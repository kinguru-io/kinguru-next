import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";

const contactLinkClassName = css({
  fontSize: "lg",
  fontWeight: "bold",
  _hover: { color: "primary" },
});

export function Contacts() {
  return (
    <Stack gap="2" alignItems="flex-end">
      <HStack gap="2">
        <Icon name="common/phone" className={css({ fontSize: "2xl" })} />
        <a href="tel:+48792665092" className={contactLinkClassName}>
          +48792665092
        </a>
      </HStack>
      <a href="tel:+48571807747" className={contactLinkClassName}>
        +48571807747
      </a>
    </Stack>
  );
}
