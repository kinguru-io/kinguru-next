import { Blog } from "@prisma/client";
import { FC } from "react";
import { Icon } from "@/components/uikit";
import { truncateText } from "@/lib/utils";
import { css } from "~/styled-system/css";
import { stack } from "~/styled-system/patterns";
interface Props extends Blog {
  step?: number | string;
}
export const BlogLinkCard: FC<Props> = ({ step, title, description }) => {
  return (
    <article
      className={stack({
        gap: "2",
        pt: "10",
        padding: "6",
        paddingTop: "10",
        backgroundColor: "light",
        borderRadius: "xl",
        position: "relative",
        zIndex: "1",
        cursor: "pointer",
        overflow: "hidden",
        minW: "400px",
        minH: "215px",
        transition: "transform 0.3s ease",
        md: {
          padding: "8",
        },
        "&:hover": {
          transform: "scale(1.03)",
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
        {truncateText(title, 60, false)}
      </h3>
      <p className={css({ fontSize: "sm", lineHeight: "1.6" })}>
        {truncateText(description, 150, true)}
      </p>
      <div
        className={css({
          position: "absolute",
          right: "3",
          bottom: "3",
        })}
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
      </div>
    </article>
  );
};
