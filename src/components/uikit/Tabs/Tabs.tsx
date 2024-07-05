"use client";

import { useTranslations } from "next-intl";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
  useEffect,
  type ComponentPropsWithoutRef,
  type ComponentProps,
} from "react";
import { tagStyles } from "@/components/uikit/Tag/Tag";
import { css, cx } from "~/styled-system/css";
import { Box, BoxProps, styled } from "~/styled-system/jsx";

type TabsContextType = {
  activeTabIdx: number;
  setActiveTabIdx: Dispatch<SetStateAction<number>>;
  tabsVisited: number[];
  setTabsVisited: Dispatch<SetStateAction<number[]>>;
  resetTabsVisited?: any;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const PassVisitedTabsProvider: Omit<
  TabsContextType,
  "activeTabIdx" | "setActiveTabIdx"
> = {
  tabsVisited: [],
  setTabsVisited: () => {},
  resetTabsVisited: () => {
    PassVisitedTabsProvider.tabsVisited = [0];
  },
};

export function useTabs() {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error("useTabs() must be used within a <TabsWrapper />");
  }

  return context;
}

export function TabsWrapper({ children }: { children: React.ReactNode }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [tabsVisited, setTabsVisited] = useState<number[]>([0]);

  useEffect(() => {
    PassVisitedTabsProvider.tabsVisited = tabsVisited;
    PassVisitedTabsProvider.setTabsVisited = setTabsVisited;
  }, [tabsVisited]);

  useEffect(() => {
    return () => {
      PassVisitedTabsProvider.resetTabsVisited();
    };
  }, []);

  return (
    <TabsContext.Provider
      value={{
        activeTabIdx,
        setActiveTabIdx,
        tabsVisited,
        setTabsVisited,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export const TabList = styled("nav", {
  base: {
    display: "flex",
    gap: "2",
    overflowX: "auto",
    padding: "0.5", // do not cut button box shadows
  },
});

const tabButtonClassName = cx(
  tagStyles({ variant: "solid" }),
  css({
    paddingBlock: "2.5",
    colorPalette: "tertiary",
    _selected: { colorPalette: "primary" },
    _checked: { bgColor: "success.darker", color: "light" },
  }),
);

function TabButton({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cx(tabButtonClassName, className)} {...props}>
      {children}
    </button>
  );
}

type TabProps = Omit<
  ComponentProps<typeof TabButton>,
  "type" | "onClick" | "aria-selected" | "aria-checked"
> & {
  tabIdx: number;
  label: string;
  setActiveForm: (tabIdx: number) => void;
  isDisabled?: boolean;
};

export function Tab({
  tabIdx,
  label,
  setActiveForm,
  isDisabled = false,
  ...buttonProps
}: TabProps) {
  const t = useTranslations("form.multi_step");
  const { activeTabIdx, setActiveTabIdx, tabsVisited, setTabsVisited } =
    useTabs();

  PassVisitedTabsProvider.tabsVisited = tabsVisited;
  PassVisitedTabsProvider.setTabsVisited = setTabsVisited;

  const handleActiveTab = () => {
    if (!isDisabled) {
      // Only set active tab if the tab is not disabled
      setActiveTabIdx(tabIdx);
      setActiveForm(tabIdx);

      // Update tabsVisited state
      if (!tabsVisited.includes(tabIdx)) {
        setTabsVisited((prev) => prev.concat(tabIdx));
      }
    }
  };

  const isSucceed =
    !isDisabled &&
    tabsVisited.includes(activeTabIdx) &&
    activeTabIdx !== tabIdx;

  return (
    <TabButton
      type="button"
      onClick={handleActiveTab}
      aria-selected={tabIdx === activeTabIdx}
      aria-checked={isSucceed}
      disabled={isDisabled}
      {...(isDisabled && {
        title: t("complete_current_step"),
      })}
      {...buttonProps}
    >
      {label}
    </TabButton>
  );
}

export function TabContent<T>({
  tabList,
  children,
  ...boxProps
}: BoxProps & {
  tabList: Partial<T & { content: React.ReactNode }>[];
}) {
  const { activeTabIdx } = useTabs();

  const tabItem = tabList[activeTabIdx];

  if (!tabItem) return null;

  return (
    <Box {...boxProps}>
      {tabItem.content}
      {children}
    </Box>
  );
}
