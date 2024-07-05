import * as s3RequestPresignerModule from "@aws-sdk/s3-request-presigner";
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, delay, http } from "msw";
import { NextIntlClientProvider } from "next-intl";
import { createMock } from "storybook-addon-module-mock";
import { ProfileImagePicker } from "./ProfileImagePicker";

import en from "~/public/locales/en/common.json";
import { Box } from "~/styled-system/jsx";

const meta: Meta<typeof ProfileImagePicker> = {
  title: "UiKit/Forms/ProfileImagePicker",
  component: ProfileImagePicker,
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={en}>
        <Box maxWidth="breakpoint-md">
          <Story />
        </Box>
      </NextIntlClientProvider>
    ),
  ],
  argTypes: {
    ratio: {
      options: [21 / 9, 16 / 9, 4 / 3, 1 / 1],
      control: {
        type: "radio",
        labels: {
          [21 / 9]: "21:9",
          [16 / 9]: "16:9",
          [4 / 3]: "4:3",
          [1 / 1]: "1:1",
        },
      },
    },
  },
};

const responseSRC = faker.image.avatarGitHub();

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageUpload: Story = {
  args: {
    name: "profile_image",
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mockImageUpload = createMock(
          s3RequestPresignerModule,
          "getSignedUrl",
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
