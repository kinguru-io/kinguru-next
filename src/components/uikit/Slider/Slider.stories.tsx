import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Slider, SliderItem } from "./Slider";
import { css } from "~/styled-system/css";
import { AspectRatio, Container } from "~/styled-system/jsx";
import { slider } from "~/styled-system/recipes";

const items = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 640, width: 480 }),
}));

const meta: Meta<typeof Slider> = {
  title: "UIKit/Slider",
  decorators: [
    (Story) => (
      <Container maxWidth="breakpoint-md">
        <Story />
      </Container>
    ),
  ],
  argTypes: {
    buttonPosition: {
      options: slider.variantMap.buttonPosition,
      control: "radio",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSlider: Story = {
  render: ({ buttonPosition }) => (
    <Slider slidesCount={items.length} buttonPosition={buttonPosition}>
      {items.map((item, idx) => (
        <SliderItem key={item.id} buttonPosition={buttonPosition}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={item.src}
              fill
              alt="Default Slider"
              priority={idx === 0}
            />
          </AspectRatio>
        </SliderItem>
      ))}
    </Slider>
  ),
};

export const SlidesPerView: Story = {
  args: { buttonPosition: "outer" },
  render: ({ buttonPosition }) => (
    <Slider
      slidesCount={items.length}
      buttonPosition={buttonPosition}
      trackClassName={css({ gap: "2" })}
    >
      {items.map((item, idx) => (
        <SliderItem
          key={item.id}
          buttonPosition={buttonPosition}
          className={css({ flexGrow: "1", flexBasis: "32", width: "unset" })}
        >
          <AspectRatio ratio={16 / 9}>
            <Image src={item.src} fill alt="Slider" priority={idx <= 5} />
          </AspectRatio>
        </SliderItem>
      ))}
    </Slider>
  ),
};
