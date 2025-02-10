import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import { InnerBlogProps } from "../../interfaces";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";

export const InnerBlogHeader: FC<InnerBlogProps> = ({ detailBlog }) => {
  const formattedCreatedDate = format(
    new Date(detailBlog.createdAt),
    "dd.MM.yyyy",
  );
  return (
    <VStack
      className={css({
        justifyContent: "start",
        md: { padding: "9" },
        position: "relative",
        bgColor: "primary",
        borderRadius: "3xl",
        padding: "1.4rem",
        alignItems: "flex-start",
      })}
    >
      <h5
        className={css({
          color: "black",
          fontSize: "1.1rem",
          fontWeight: "700",
          zIndex: "1",
          md: { fontSize: "1.6rem" },
          pb: "37px",
          textTransform: "uppercase",
        })}
      >
        {formattedCreatedDate}
      </h5>
      <h2
        className={css({
          zIndex: "1",
          color: "black",
          md: { fontSize: "45px" },
          fontSize: "2rem",
          fontWeight: "700",
          maxWidth: "1000px",
          textWrap: "pretty",
        })}
      >
        <strong>{detailBlog.title}</strong>
      </h2>
      {detailBlog.image && (
        <Image
          className={css({
            position: "absolute",
            top: "0",
            borderRadius: "3xl",
            right: "0",
            width: "100%",
            height: "100%",
          })}
          src={detailBlog.image}
          alt={detailBlog.title}
          width={200}
          height={200}
        />
      )}
    </VStack>
  );
};
