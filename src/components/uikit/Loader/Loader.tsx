import { ImSpinner8 } from "react-icons/im";
import { css } from "~/styled-system/css";

type LoaderProps = {
  isLoading?: boolean;
};

export function Loader({ isLoading = true }: LoaderProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <span
      data-loading
      className={css({
        position: "absolute",
        inset: 0,
        bg: "neutral.50",
        opacity: 0.9,
        zIndex: 1,
      })}
    >
      <span
        className={css({
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        })}
      >
        <ImSpinner8 className={css({ animation: "spin" })} />
      </span>
    </span>
  );
}
