import { css } from "~/styled-system/css";
import { stack } from "~/styled-system/patterns";

export function BlogLinkCard({
  step,
  title,
  subtitle,
}: {
  step?: number | string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <article
      className={stack({
        position: "relative",
        gap: "2",
        padding: "6",
        borderRadius: "xl",
        bgColor: "light",
        zIndex: "1",
        overflow: "hidden",
        md: {
          padding: "8",
        },
      })}
    >
      {typeof step !== "undefined" && (
        <span
          className={css({
            zIndex: "-1",
            position: "absolute",
            color: "primary.lighter",
            fontWeight: "700",
            transform: "scale(6)",
            lineHeight: "0",
            insetInlineStart: "5",
            md: {
              insetBlockStart: "7",
              transform: "scale(7)",
            },
          })}
          aria-hidden
        >
          {step}
        </span>
      )}
      <h3
        className={css({
          fontWeight: "700",
          fontSize: "px17",
          md: {
            fontSize: "lg",
          },
        })}
      >
        {title}
      </h3>
      <p className={css({ fontSize: "sm", lineHeight: "1.6" })}>{subtitle}</p>
      {/* <Link
        className={css({
          alignSelf: "flex-end",
          marginBlockStart: "auto",
          "& > span": {
            srOnly: true,
          },
        })}
        href={href}
      >
        <Icon
          className={css({
            borderRadius: "full",
            bgColor: "primary",
            padding: "2",
            fontSize: "xl",
          })}
          name="action/arrow-tail"
        />
        <span>{title}</span>
      </Link> */}
    </article>
  );
}
