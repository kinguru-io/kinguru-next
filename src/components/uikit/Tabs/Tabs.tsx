"use client";

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from "react";
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
};

const TabsContext = createContext<TabsContextType | null>(null);

export function useTabs() {
  const context = useContext(TabsContext);

  if (context === null) {
    throw new Error("useTabs() must be used within a <TabsWrapper />");
  }

  return context;
}

export function TabsWrapper({ children }: { children: React.ReactNode }) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTabIdx, setActiveTabIdx }}>
      {children}
    </TabsContext.Provider>
  );
}

export const TabList = styled("div", {
  base: { display: "flex", gap: "4px", overflowX: "auto" },
});

const TabButton = styled("button", {
  base: {
    cursor: "pointer",
  },
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
        color: "neutral.2",
        _after: {
          content: '""',
          display: "inline-block",
          position: "absolute",
          insetInlineStart: "4px",
          insetBlockEnd: "0",
          width: "calc(100% - 8px)",
          height: "4px",
          transition: "colors",
          bgColor: "primary.disabled",
        },
        _selected: { color: "neutral.1", _after: { bgColor: "primary" } },
        _focusVisible: { outline: "none", _after: { bgColor: "focus" } },
      },
    },
  },
  defaultVariants: { variant: "line-below" },
});

type TabProps = StyledVariantProps<typeof TabButton> &
  Omit<HTMLStyledProps<"button">, "type" | "onClick" | "aria-selected"> & {
    tabIdx: number;
    label: string;
  };

export function Tab({ tabIdx, label, ...buttonProps }: TabProps) {
  const { activeTabIdx, setActiveTabIdx } = useTabs();

  return (
    <TabButton
      type="button"
      onClick={() => setActiveTabIdx(tabIdx)}
      aria-selected={tabIdx === activeTabIdx}
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
