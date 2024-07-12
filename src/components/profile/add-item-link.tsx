import { Icon } from "@/components/uikit";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import type { SystemStyleObject } from "~/styled-system/types";

export function AddItemLink({
  href,
  label,
  ...styleProps
}: SystemStyleObject & { href: string; label: string }) {
  return (
    <Link
      className={css({
        display: "flex",
        gap: "2.5",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "secondary",
        bgColor: "secondary.lighter",
        fontSize: "px15",
        borderRadius: "md",
        outline: "1px solid transparent",
        _focusVisible: { boxShadow: "focus" },
        ...styleProps,
      })}
      href={href}
    >
      <Icon
        name="action/cross"
        className={css({
          rotate: "45deg",
          border: "2px solid",
          fontSize: "md",
          borderRadius: "full",
          padding: "2",
        })}
      />
      {label}
    </Link>
  );
}
