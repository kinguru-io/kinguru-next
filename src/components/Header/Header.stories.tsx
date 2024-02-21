/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import * as nextauth from "next-auth/next";
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
        const mockSession = createMock(nextauth, "getServerSession");
        mockSession.mockReturnValue(Promise.resolve(null));
        return [mockSession];
      },
    },
  },
};

export const authHeader: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mockSession = createMock(nextauth, "getServerSession");
        mockSession.mockReturnValue(
          Promise.resolve({ user: { image: faker.image.avatar() } }),
        );
        return [mockSession];
      },
    },
  },
};
