import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Center } from "~/styled-system/jsx";

export function Loader({ className }: { className?: string }) {
  return (
    <Center height="full" animation="fade-in" className={className}>
      <Icon
        name="common/spinner"
        className={css({ animation: "spin", fontSize: "3xl" })}
      />
    </Center>
  );
}
