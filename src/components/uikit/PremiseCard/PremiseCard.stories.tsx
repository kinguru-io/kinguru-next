/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import {
  PremiseCard,
  PremiseContent,
  PremiseDescription,
  PremisePrice,
  PremiseSlider,
  PremiseTextContent,
  PremiseTitle,
  PremiseTitleSize,
} from "./PremiseCard";
import { Button } from "../Button";
import { Slider, SliderItem } from "../Slider/Slider";
import { AspectRatio } from "~/styled-system/jsx";

const items = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 220, width: 391 }),
}));

const meta = {
  title: "UIKit/PremiseCard",
  component: PremiseCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PremiseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPremiseCard: Story = {
  args: { children: null },
  render: () => {
    return (
      <PremiseCard>
        <PremiseContent>
          <PremiseTextContent>
            <PremiseTitle>
              Зал 1
              <PremiseTitleSize>
                (20 м<sup>2</sup>)
              </PremiseTitleSize>
            </PremiseTitle>
            <PremiseDescription>{faker.lorem.lines(4)}</PremiseDescription>
          </PremiseTextContent>
          <Button>Подробнее</Button>
        </PremiseContent>
        <PremiseSlider>
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
          <PremisePrice>200$</PremisePrice>
        </PremiseSlider>
      </PremiseCard>
    );
  },
};
