/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import * as nextintl from "next-intl/server";
import { createMock } from "storybook-addon-module-mock";
import { Header } from "./Header";
import * as auth from "@/auth.ts";
import russianLocale from "~/public/locales/ru/common.json";

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
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ["events", "places"],
      },
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
        const mockSession = createMock(auth, "getSession");
        mockSession.mockReturnValue(Promise.resolve(null));

        const mockTranslations = createMock(nextintl, "getTranslations");
        mockTranslations.mockReturnValue(
          Promise.resolve(
            ((langCode: keyof typeof russianLocale.navbar) =>
              russianLocale.navbar[langCode]) as unknown as ReturnType<
              typeof nextintl.getTranslations
            >,
          ),
        );
        return [mockSession, mockTranslations];
      },
    },
  },
};

export const authHeader: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mockSession = createMock(auth, "getSession");
        mockSession.mockReturnValue(
          Promise.resolve({
            user: {
              id: "213123",
              image: faker.image.avatar(),
              name: "Name Surname",
              speaker: null,
              stripeCustomerId: "123123",
            },
            expires: "date",
          }),
        );

        const mockTranslations = createMock(nextintl, "getTranslations");
        mockTranslations.mockReturnValue(
          Promise.resolve(
            ((langCode: keyof typeof russianLocale.navbar) =>
              russianLocale.navbar[langCode]) as unknown as ReturnType<
              typeof nextintl.getTranslations
            >,
          ),
        );
        return [mockSession, mockTranslations];
      },
    },
  },
};
