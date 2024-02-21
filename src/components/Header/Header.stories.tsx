/* eslint-disable import/no-extraneous-dependencies */
import { Meta, StoryObj } from "@storybook/react";
import * as gss from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { createMock } from "storybook-addon-module-mock";
import { Header } from "./Header";

import russianLocale from "../../../public/locales/ru/common.json";

const meta = {
  title: "Header",
  component: () => (
    <NextIntlClientProvider locale="ru" messages={russianLocale}>
      <Header />
    </NextIntlClientProvider>
  ),
  parameters: {
    docs: {
      source: { type: "code" },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const notAuthHeader: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(gss);
        mock.mockReturnValue(gss.getServerSession);
        return [mock];
      },
    },
  },
};
