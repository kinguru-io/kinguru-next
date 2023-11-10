import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const ProfileFilled: FC = () => {
  const { t } = useLocale();
  return (
    <Heading fontSize={"lg"}>{t("dashboard.main_profile_filled")}</Heading>
  );
};
