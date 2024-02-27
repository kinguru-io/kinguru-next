/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Slider, SliderItem } from "./Slider";

const items = Array.from({ length: 3 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 220, width: 391 }),
}));

const meta = {
  title: "UIKit/Slider",
  component: () => (
    <Slider
      items={items}
      renderItem={({ item, isSnapPoint }) => (
        <SliderItem key={item.id} isSnapPoint={isSnapPoint}>
          <Image src={item.src} width="391" height="220" alt="" />
        </SliderItem>
      )}
    ></Slider>
  ),
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSlider: Story = {};
