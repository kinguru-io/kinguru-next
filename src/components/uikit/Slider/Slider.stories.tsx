/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Slider, SliderItem } from "./Slider";
import { AspectRatio, Box } from "~/styled-system/jsx";

const items = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 220, width: 391 }),
}));

const meta = {
  title: "UIKit/Slider",
  component: () => (
    <Box w="391px" h="220px">
      <Slider slidesCount={items.length}>
        {items.map((item) => (
          <SliderItem key={item.id}>
            <AspectRatio ratio={16 / 9}>
              <Image src={item.src} fill alt="" />
            </AspectRatio>
          </SliderItem>
        ))}
      </Slider>
    </Box>
  ),
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSlider: Story = {};
