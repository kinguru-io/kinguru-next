import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import * as nextIntl from "next-intl/server";
import { createMock } from "storybook-addon-module-mock";
import { Footer } from "./Footer";
import englishLocale from "../../../public/locales/en/common.json";

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en">
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterStory: Story = {
  parameters: {
    moduleMock: {
      mock: () => {
        const getTranslationsMock = createMock(nextIntl, "getTranslations");
        const getLocaleMock = createMock(nextIntl, "getLocale");

        getTranslationsMock.mockReturnValue(
          // @ts-expect-error
          Promise.resolve((key: keyof typeof englishLocale.footer) =>
            englishLocale.footer[key].replace(
              "{year}",
              new Date().getFullYear().toString(),
            ),
          ),
        );
        getLocaleMock.mockReturnValue(Promise.resolve("en"));

        return [getTranslationsMock, getLocaleMock];
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/en",
      },
    },
  },
};
