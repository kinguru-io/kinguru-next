import { Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Center } from "~/styled-system/jsx";

export function Loader() {
  return (
    <Center height="full" animation="fade-in">
      <Icon
        name="common/spinner"
        className={css({ animation: "spin", fontSize: "3xl" })}
      />
    </Center>
  );
}
