import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { SidebarItem } from "@/components/dashboard/sidebar";

export const Sidebar: FC = () => {
  const { pathname } = useRouter();
  const t = useTranslations();
  const { data: session } = useSession();
  const sidebarNavigation = [
    {
      name: t("dashboard.sidebar_home"),
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      name: t("dashboard.sidebar_personal_info"),
      href: "/dashboard/personal",
      active: pathname === "/dashboard/personal",
    },
    {
      name: t("dashboard.sidebar_my_activity"),
      href: "/dashboard/activity",
      active: pathname === "/dashboard/activity",
    },
    {
      name: t("dashboard.sidebar_my_events"),
      href: "/dashboard/events",
      active: pathname === "/dashboard/events",
      disabled: !session?.user?.speaker,
    },
    {
      name: t("dashboard.sidebar_subscriptions"),
      href: "/dashboard/subscriptions",
      active: pathname === "/dashboard/subscriptions",
    },
    {
      name: t("dashboard.sidebar_settings"),
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ];
  return (
    <Flex
      w={["100%", "100%", "100%", 0, 0, 0]}
      flexDir={"column"}
      position={[
        "relative",
        "relative",
        "relative",
        "sticky",
        "sticky",
        "sticky",
      ]}
      top={[0, 0, 0, "65px", "65px", "65px"]}
      mb={[10, 10, 10, 0, 0, 0]}
      h={"fit-content"}
    >
      {sidebarNavigation.map((props) => (
        <SidebarItem key={props.name} {...props} />
      ))}
    </Flex>
  );
};
