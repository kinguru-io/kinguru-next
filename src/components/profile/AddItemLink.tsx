import { RxCross1 } from "react-icons/rx";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import type { SystemStyleObject } from "~/styled-system/types";

export function AddItemLink({
  href,
  ...styleProps
}: SystemStyleObject & { href: string }) {
  return (
    <Link
      className={css({
        layerStyle: "dashedWrapper",
        display: "grid",
        placeItems: "center",
        outline: "none",
        _focus: { borderColor: "focus" },
        ...styleProps,
      })}
      href={href}
    >
      <RxCross1
        className={css({
          color: "primary",
          rotate: "45deg",
          fontSize: "10em",
        })}
      />
    </Link>
  );
}
