import { FC } from "react";
import { BlogPageProps } from "../interfaces";
import { Card, Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";

export const BlogCard: FC<BlogPageProps> = ({
  formattedCreatedDate,
  formattedDescription,
  formattedTitle,
}) => {
  return (
    <Card
      variant="profile-venue"
      className={css({
        gap: "2",
        pt: "10",
        padding: "6",
        paddingTop: "10",
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
      <span
        className={css({
          position: "absolute",
          zIndex: "-1",
          top: "2",
          color: "lightslategrey",
          right: "2",
        })}
      >
        {formattedCreatedDate}
      </span>
      <h3
        className={css({
          marginTop: "1",
          fontWeight: "700",
          fontSize: "px17",
          md: {
            fontSize: "lg",
          },
        })}
        dangerouslySetInnerHTML={{
          __html: formattedTitle ?? "",
        }}
      />
      <p
        className={css({ fontSize: "sm", lineHeight: "1.6" })}
        dangerouslySetInnerHTML={{
          __html: formattedDescription ?? "",
        }}
      />

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
    </Card>
  );
};
