import { faker } from "@faker-js/faker";
import type { Meta } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import {
  Tab,
  TabContent,
  TabList,
  TabsWrapper,
  Button,
  useTabs,
} from "@/components/uikit";

import en from "~/public/locales/en/common.json";

export default {
  title: "UIKit/Tabs",
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={en}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
} satisfies Meta;

const tabsContent = Array.from({ length: 7 }, () => {
  return {
    label: faker.lorem.words({ min: 1, max: 4 }),
    content: <>{faker.animal.type()}</>,
  };
});

export const Basic = {
  render: () => {
    return (
      <TabsWrapper>
        <TabList marginBlockEnd="50px">
          {tabsContent.map(({ label }, i) => (
            <Tab
              key={label}
              tabIdx={i}
              label={label}
              setActiveForm={() => {}}
            />
          ))}
        </TabList>
        <TabContent
          tabList={tabsContent}
          padding="10px"
          border="1px solid token(colors.tertiary)"
          borderRadius="10px"
        />
      </TabsWrapper>
    );
  },
};

function NextButton({ lastIdx }: { lastIdx: number }) {
  const { setActiveTabIdx } = useTabs();

  return (
    <Button
      onClick={() =>
        setActiveTabIdx((prevIdx) =>
          prevIdx === lastIdx ? prevIdx : prevIdx + 1,
        )
      }
    >
      Next
    </Button>
  );
}

export const BasicWithNextButton = {
  render: () => {
    return (
      <TabsWrapper>
        <TabList overflowX="auto" marginBlockEnd="50px">
          {tabsContent.map(({ label }, i) => (
            <Tab
              key={label}
              tabIdx={i}
              label={label}
              setActiveForm={() => {}}
            />
          ))}
        </TabList>
        <TabContent
          tabList={tabsContent}
          padding="10px"
          border="1px solid token(colors.tertiary)"
          borderRadius="10px"
        >
          <NextButton lastIdx={tabsContent.length - 1} />
        </TabContent>
      </TabsWrapper>
    );
  },
};
