import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { createMock } from "storybook-addon-module-mock";
import { ImageDropZone } from "./image-drop-zone";
import { ProfileImagePicker } from "../ProfileImagePicker";
import { Button } from "@/components/uikit";
import * as awsUtilModule from "@/lib/shared/utils/aws";
import en from "~/public/locales/en/common.json";
import { css } from "~/styled-system/css";
import { Box, Container } from "~/styled-system/jsx";

const meta: Meta<typeof ImageDropZone> = {
  title: "UiKit/Forms/Files/ImageDropZone",
  component: ImageDropZone,
  args: { maxCount: 12 },
  decorators: [
    (Story, { args }) => (
      <NextIntlClientProvider locale="en" messages={en}>
        <Container>
          Images allowed: {args.maxCount}
          <Story />
        </Container>
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;

const getImage = () =>
  faker.image.urlLoremFlickr({ width: 640, height: 380, category: "dogs" });

export const Basic: StoryObj<typeof meta> = {
  args: {
    renderFiles: ({ srcList, removeAt }) => {
      return (
        <Box
          css={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2",
            marginBlockStart: "4",
          }}
        >
          {srcList.map((src, idx) => (
            <Box
              key={src}
              css={{ position: "relative", maxWidth: "sm", minWidth: "40" }}
            >
              <ProfileImagePicker imageSrc={src} groupKey="storybook" />
              {src && (
                <Button
                  className={css({
                    position: "absolute",
                    padding: "2",
                    insetBlockEnd: "2",
                    insetInlineEnd: "2",
                  })}
                  type="button"
                  colorPalette="danger"
                  onClick={() => removeAt(idx)}
                  icon="Remove"
                />
              )}
            </Box>
          ))}
        </Box>
      );
    },
  },
  parameters: {
    moduleMock: {
      mock: () => {
        const mockSafeUpload = createMock(awsUtilModule, "safeUploadToBucket");
        mockSafeUpload.mockImplementation(({ urls }) =>
          Promise.resolve(Array.from({ length: urls.length }, getImage)),
        );

        return [mockSafeUpload];
      },
    },
  },
};
