import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import * as nextIntl from "next-intl/server";
import { createMock } from "storybook-addon-module-mock";
import { Header } from "./Header";
import * as auth from "@/auth";
import en from "~/public/locales/en/common.json";

const meta = {
  title: "Header",
  component: () => (
    <NextIntlClientProvider locale="en" messages={en.navbar}>
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
        mockSession.mockReturnValue(
          new Promise((resolve) => {
            const id = setTimeout(() => {
              resolve(null);
              clearTimeout(id);
            }, 800);
          }),
        );

        const mockTranslations = createMock(nextIntl, "getTranslations");
        mockTranslations.mockReturnValue(
          Promise.resolve(
            ((key: keyof typeof en.navbar) =>
              en.navbar[key]) as unknown as ReturnType<
              typeof nextIntl.getTranslations
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
          new Promise((resolve) => {
            const id = setTimeout(() => {
              resolve({
                user: {
                  id: "213123",
                  image: faker.image.avatar(),
                  name: "Name Surname",
                  speaker: null,
                  stripeCustomerId: "123123",
                  organizations: [],
                  confirmed: true,
                },
                expires: "date",
              });
              clearTimeout(id);
            }, 800);
          }),
        );

        const mockTranslations = createMock(nextIntl, "getTranslations");
        mockTranslations.mockReturnValue(
          Promise.resolve(
            ((key: keyof typeof en.navbar) =>
              en.navbar[key]) as unknown as ReturnType<
              typeof nextIntl.getTranslations
            >,
          ),
        );
        return [mockSession, mockTranslations];
      },
    },
  },
};
