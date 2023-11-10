import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { SidebarItem } from "@/components/dashboard/sidebar";
import { useLocale } from "@/utils/use-locale.ts";

export const Sidebar: FC = () => {
  const { pathname } = useRouter();
  const { t } = useLocale();
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
      w={"26%"}
      flexDir={"column"}
      position={"sticky"}
      top={"65px"}
      h={"fit-content"}
    >
      {sidebarNavigation.map((props) => (
        <SidebarItem key={props.name} {...props} />
      ))}
    </Flex>
  );
};
