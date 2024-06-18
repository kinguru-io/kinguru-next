import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import * as nextIntl from "next-intl/server";
// eslint-disable-next-line import/no-extraneous-dependencies
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
        const mock = createMock(nextIntl, "getTranslations");
        // @ts-ignore
        mock.mockReturnValue((key) => englishLocale.footer[key]);
        return [mock];
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
