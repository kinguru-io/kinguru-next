import { css } from "~/styled-system/css";

export type CollapseProps = {
  isShown: boolean;
  children: React.ReactNode;
};

export function Collapse({ isShown, children }: CollapseProps) {
  return (
    <span
      className={css({
        display: "grid",
        gridTemplateRows: "0fr",
        transition: "grid-template-rows 350ms",
        "&[data-shown=true]": {
          gridTemplateRows: "1fr",
        },
      })}
      data-shown={isShown}
    >
      <span className={css({ overflow: "hidden" })}>{children}</span>
    </span>
  );
}
