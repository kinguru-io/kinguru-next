import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const Popular: FC = () => {
  const { t } = useLocale();
  return <Heading fontSize={"lg"}>{t("dashboard.main_popular")}</Heading>;
};
