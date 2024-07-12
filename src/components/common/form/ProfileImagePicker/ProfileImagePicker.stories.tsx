import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { createMock } from "storybook-addon-module-mock";
import { ProfileImagePicker } from "./ProfileImagePicker";
import * as awsUtilModule from "@/lib/shared/utils/aws";

import en from "~/public/locales/en/common.json";
import { Box } from "~/styled-system/jsx";

const meta: Meta<typeof ProfileImagePicker> = {
  title: "UiKit/Forms/Files/ProfileImagePicker",
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

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageUpload: Story = {
  args: {
    name: "profile_image",
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mockSafeUpload = createMock(awsUtilModule, "safeUploadToBucket");
        mockSafeUpload.mockImplementation(({ urls }) =>
          Promise.resolve(
            Array.from({ length: urls.length }, faker.image.avatar),
          ),
        );

        return [mockSafeUpload];
      },
    },
  },
};
