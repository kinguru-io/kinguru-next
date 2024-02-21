// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { Footer } from "./Footer";
import englishLocale from "../../../public/locales/en/common.json";
import polishLocale from "../../../public/locales/pl/common.json";
import russianLocale from "../../../public/locales/ru/common.json";

const meta = {
  title: "Footer",
  component: () => (
    <NextIntlClientProvider locale="ru" messages={russianLocale}>
      <Footer />
    </NextIntlClientProvider>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const russianFooter: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => (
    <NextIntlClientProvider locale="ru" messages={russianLocale}>
      <Footer />
    </NextIntlClientProvider>
  ),
};

export const englishFooter: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => (
    <NextIntlClientProvider locale="en" messages={englishLocale}>
      <Footer />
    </NextIntlClientProvider>
  ),
};

export const polishFooter: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  render: () => (
    <NextIntlClientProvider locale="pl" messages={polishLocale}>
      <Footer />
    </NextIntlClientProvider>
  ),
};
