import { FC } from "react";
import { InnerBlogProps } from "../../interfaces";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";

export const InnerBlogMain: FC<InnerBlogProps> = ({ detailBlog }) => {
  const formattedDescription = detailBlog.description.replace(/\\n/g, "\n");
  return (
    <VStack
      className={css({
        maxWidth: "920px",
        justifyContent: "center",
        alignItems: "center",
        textWrap: "balance",
        margin: "0 auto",
        mb: "0px",
        md: { mb: "0px" },
        width: "full",
      })}
    >
      <p
        className={css({
          lineHeight: "24px",
          textWrap: "pretty",
          margin: "50px 0",
          fontSize: "0.9rem",
          md: { fontSize: "1.1rem" },
          color: "#000000",
          fontWeight: "400",
          whiteSpace: "pre-line",
        })}
      >
        {formattedDescription}
      </p>
    </VStack>
  );
};
