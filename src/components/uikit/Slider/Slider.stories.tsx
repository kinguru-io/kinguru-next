/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Slider, SliderItem } from "./Slider";
import { AspectRatio } from "~/styled-system/jsx";
import { slider } from "~/styled-system/recipes";

const items = Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  src: faker.image.urlLoremFlickr({ height: 220, width: 391 }),
}));

const meta: Meta<typeof Slider> = {
  title: "UIKit/Slider",
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
      {items.map((item) => (
        <SliderItem key={item.id} buttonPosition={buttonPosition}>
          <AspectRatio ratio={16 / 9}>
            <Image src={item.src} fill alt="" />
          </AspectRatio>
        </SliderItem>
      ))}
    </Slider>
  ),
};

// TODO in progress
// export const XSlidesPerView: Story = {
//   render: ({ buttonPosition }) => (
//     <Slider slidesCount={items.length} buttonPosition={buttonPosition}>
//       {items.map((item) => (
//         <SliderItem key={item.id} buttonPosition={buttonPosition}>
//           <AspectRatio ratio={16 / 9}>
//             <Image src={item.src} fill alt="" />
//           </AspectRatio>
//         </SliderItem>
//       ))}
//     </Slider>
//   ),
// };
