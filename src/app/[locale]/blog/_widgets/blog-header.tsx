import { useTranslations } from "next-intl";
import { FC } from "react";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";
const BlogHeader: FC = () => {
  const t = useTranslations("blog");
  return (
    <VStack
      className={css({
        bgColor: "primary",
        padding: "13",
        borderRadius: "2xl",
        boxShadow: "lg",
      })}
    >
      <h2
        className={css({
          color: "gray.800",
          fontSize: "5xl",
          fontWeight: "bold",
        })}
      >
        {t("title")}
      </h2>
    </VStack>
  );
};
export default BlogHeader;
