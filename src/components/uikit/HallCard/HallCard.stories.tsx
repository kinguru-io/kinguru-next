/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import {
  HallCard,
  HallContent,
  HallDescription,
  HallPrice,
  HallSlider,
  HallTitle,
} from "./HallCard";
import { Button } from "../Button";
import { Slider, SliderItem } from "../Slider/Slider";
import { AspectRatio } from "~/styled-system/jsx";

const items = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 220, width: 391 }),
}));

const meta = {
  title: "HallCard",
  component: HallCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HallCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHallCard: Story = {
  args: { children: null },
  render: () => {
    return (
      <HallCard>
        <HallContent>
          <HallTitle>Зал 1</HallTitle>
          <HallDescription>{faker.lorem.lines(4)}</HallDescription>
          <Button>Подробнее</Button>
        </HallContent>
        <HallSlider>
          <Slider
            items={items}
            renderItem={({ item, isSnapPoint }) => (
              <SliderItem key={item.id} isSnapPoint={isSnapPoint}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={item.src} fill alt="" />
                </AspectRatio>
              </SliderItem>
            )}
          ></Slider>
          <HallPrice>200$</HallPrice>
        </HallSlider>
      </HallCard>
    );
  },
};
