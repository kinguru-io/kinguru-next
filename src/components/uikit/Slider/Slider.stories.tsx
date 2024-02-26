/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Slider } from "./Slider";

const meta = {
  title: "UIKit/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSlider: Story = {
  args: {
    children: [
      <Image
        width={391}
        height={220}
        alt="test image"
        src={faker.image.urlLoremFlickr({ height: 220, width: 391 })}
      />,
      <Image
        width={391}
        height={220}
        alt="test image"
        src={faker.image.urlLoremFlickr({ height: 220, width: 391 })}
      />,
      <Image
        width={391}
        height={220}
        alt="test image"
        src={faker.image.urlLoremFlickr({ height: 220, width: 391 })}
      />,
      <Image
        width={391}
        height={220}
        alt="test image"
        src={faker.image.urlLoremFlickr({ height: 220, width: 391 })}
      />,
    ],
  },
};
