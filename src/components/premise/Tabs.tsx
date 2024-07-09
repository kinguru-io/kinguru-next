"use client";

import { ReactNode, useState } from "react";
import { css } from "~/styled-system/css";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <div className={tabList}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${tabButton} ${activeTabIndex === index ? activeTabButton : ""}`}
            onClick={() => setActiveTabIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[activeTabIndex].content}
    </>
  );
};

const tabList = css({
  display: "flex",
  gap: 2,
});

const tabButton = css({
  p: 2,
  fontSize: "sm",
  cursor: "pointer",
  background: "none",
  border: "none",
});

const activeTabButton = css({
  bgColor: "primary",
  color: "dark",
  borderRadius: "md",
});

export default Tabs;
