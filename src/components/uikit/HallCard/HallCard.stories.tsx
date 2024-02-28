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
  HallTextContent,
  HallTitle,
  HallTitleSize,
} from "./HallCard";
import { Button } from "../Button";
import { Slider, SliderItem } from "../Slider/Slider";
import { AspectRatio } from "~/styled-system/jsx";

const items = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 220, width: 391 }),
}));

const meta = {
  title: "UIKit/HallCard",
  component: HallCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof HallCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHallCard: Story = {
  args: { children: null },
  render: () => {
    return (
      <HallCard>
        <HallContent>
          <HallTextContent>
            <HallTitle>
              Зал 1
              <HallTitleSize>
                (20 м<sup>2</sup>)
              </HallTitleSize>
            </HallTitle>
            <HallDescription>{faker.lorem.lines(4)}</HallDescription>
          </HallTextContent>
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
