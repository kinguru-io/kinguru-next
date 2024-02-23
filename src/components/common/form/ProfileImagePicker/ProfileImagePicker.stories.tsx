/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, delay, http } from "msw";
import { NextIntlClientProvider } from "next-intl";
import { createMock } from "storybook-addon-module-mock";
import { ProfileImagePicker } from "./ProfileImagePicker";

import * as fileUploadModule from "@/lib/actions/file-upload";

import enLocaleMessages from "~/public/locales/en/common.json";

const meta = {
  title: "Common/Forms/ProfileImagePicker",
  component: ProfileImagePicker,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="ru" messages={enLocaleMessages}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ProfileImagePicker>;

const responseSRC = faker.image.avatarGitHub();

export default meta;
type Story = StoryObj<typeof meta>;

export const MockedImageResponse: Story = {
  args: {
    name: "profile_image",
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mockImageUpload = createMock(
          fileUploadModule,
          "uploadProfileImage",
        );
        mockImageUpload.mockReturnValue(Promise.resolve(responseSRC));

        return [mockImageUpload];
      },
    },
    msw: {
      handlers: [
        http.put(responseSRC, async () => {
          await delay(900);
          return new HttpResponse();
        }),
      ],
    },
  },
};
