import { css } from "~/styled-system/css";

export function ErrorField({ error }: { error: any }) {
  const errorFromKey = error?.root || error;

  return (
    errorFromKey && (
      <span
        className={css({
          flexGrow: "1",
          fontSize: "sm",
          color: "danger",
          animation: "fade-in",
        })}
      >
        {errorFromKey?.message}
      </span>
    )
  );
}
