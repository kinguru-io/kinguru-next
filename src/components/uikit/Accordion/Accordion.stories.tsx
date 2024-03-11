/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import { Meta } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordinItemToggle,
  AccordionItemContent,
} from "@/components/uikit";
import { css } from "~/styled-system/css";

const meta = {
  title: "UIKit/Accordion",
} satisfies Meta;

export default meta;

const features = Array.from({ length: 3 }, (_, idx) => ({
  id: "product-" + idx,
  title: faker.commerce.product(),
  desc: faker.commerce.productDescription(),
}));

export const Basic = {
  render: () => {
    return (
      <Accordion>
        {features.map(({ id, title, desc }) => {
          return (
            <AccordionItem key={id}>
              <AccordinItemToggle
                titleCss={css.raw({ textStyle: "heading.3" })}
              >
                {title}
              </AccordinItemToggle>
              <AccordionItemContent>{desc}</AccordionItemContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  },
};
