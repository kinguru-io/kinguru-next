"use client";

import { IconButton } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import IconFormFieldSuccess from "~/public/img/icon_form_field_succes.svg";
import {
  Box,
  BoxProps,
  type HTMLStyledProps,
  styled,
} from "~/styled-system/jsx";
import type { StyledVariantProps } from "~/styled-system/types";

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

export const TabList = styled("div", {
  base: { display: "flex", gap: "4px", overflowX: "auto" },
});

const TabButton = styled("button", {
  variants: {
    variant: {
      "line-below": {
        flexGrow: "1",
        flexBasis: "0",
        minWidth: "116px",
        paddingBlockEnd: "14px", // 10px + 4px (line)
        marginBlockEnd: "2px",
        position: "relative",
        textStyle: "heading.4",
        color: "secondary",
        _after: {
          content: '""',
          display: "inline-block",
          position: "absolute",
          insetInlineStart: "4px",
          insetBlockEnd: "0",
          width: "calc(100% - 8px)",
          height: "4px",
          transition: "colors",
          bgColor: "primary.lightest",
        },
        _selected: { color: "dark", _after: { bgColor: "primary" } },
        _focusVisible: { outline: "none", _after: { bgColor: "focus" } },
        _disabled: {
          cursor: "not-allowed",
          "pointer-events": "all !important",
        },
      },
    },
  },
  defaultVariants: { variant: "line-below" },
});

type TabProps = StyledVariantProps<typeof TabButton> &
  Omit<HTMLStyledProps<"button">, "type" | "onClick" | "aria-selected"> & {
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
        setTabsVisited((prev) => [...prev, tabIdx]);
      }
    }
  };

  const showSuccessIcon =
    !isDisabled &&
    tabsVisited.includes(activeTabIdx) &&
    activeTabIdx !== tabIdx;

  return (
    <TabButton
      type="button"
      onClick={handleActiveTab}
      aria-selected={tabIdx === activeTabIdx}
      disabled={isDisabled}
      {...(isDisabled && {
        title: t("complete_current_step"),
      })}
      {...buttonProps}
    >
      {label}
      {showSuccessIcon && (
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          aria-label="Done"
          fontSize="20px"
          position="absolute"
          bottom="10px"
          right="9px"
          icon={
            <Image src={IconFormFieldSuccess} alt="" width={10} height={10} />
          }
        />
      )}
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
