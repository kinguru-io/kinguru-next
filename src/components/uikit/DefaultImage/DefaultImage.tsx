import textLogo from "~/public/img/defaultImages/eventify-logo-text.svg";
import { css } from "~/styled-system/css";

export function DefaultImage() {
  return (
    <span
      className={css({
        position: "absolute",
        bgColor: "neutral.4",
        bgPosition: "center",
        bgRepeat: "no-repeat",
        bgSize: "50%",
      })}
      style={{ backgroundImage: `url(${textLogo.src})` }}
    />
  );
}
