/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { BsGeoAlt } from "react-icons/bs";
import { Tag } from "@/components/uikit";
import { Button } from "@/components/uikit/Button";
import {
  Card,
  CardInner,
  CardBody,
  CardFooter,
  CardHeading,
} from "@/components/uikit/Card";
import { css } from "~/styled-system/css";
import { AspectRatio, Box, Flex, Float } from "~/styled-system/jsx";
import { visuallyHidden } from "~/styled-system/patterns";

const meta = {
  title: "UIKit/Cards/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardTemplate: Story = {
  args: { children: null },
  render: () => {
    return (
      <Box w="310px">
        <Card>
          <a
            className={css({
              _before: {
                content: "''",
                position: "absolute",
                inset: 0,
              },
            })}
            href="#"
          >
            <span className={visuallyHidden()}>More</span>
          </a>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={faker.image.urlLoremFlickr({
                category: "business",
                width: 640,
                height: 480,
              })}
              width={640}
              height={480}
              alt="template image"
            />
            <span className={css({ bgGradient: "cardImage" })} />
            <PseudoButtonGroup />
          </AspectRatio>
          <CardInner>
            <Float placement="top-end" offset="15px" translate="none">
              <Tag variant="tertiary">42</Tag>
            </Float>

            <CardHeading>
              <h4>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae, sapiente.
              </h4>
            </CardHeading>
            <PseudoSection />
            <CardBody>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
                voluptates velit, nulla atque fugit voluptatem commodi suscipit
                explicabo quidem minima deserunt natus obcaecati eius eaque
                aperiam voluptatibus nesciunt tempora qui.
              </p>
            </CardBody>

            <CardFooter>
              <Flex alignItems="center" justifyContent="space-between">
                <span>Footer is at the end</span>
                <Button icon={<BsGeoAlt />}></Button>
              </Flex>
            </CardFooter>
          </CardInner>
        </Card>
      </Box>
    );
  },
};

function PseudoButtonGroup() {
  return (
    <span
      className={css({
        position: "absolute",
        cursor: "pointer",
        width: "fit-content!",
        height: "fit-content!",
        inset: "auto 15px 15px auto!",
        fontSize: "14px",
        color: "neutral.5",
      })}
    >
      <BsGeoAlt />
      <BsGeoAlt />
      <BsGeoAlt />
    </span>
  );
}

function PseudoSection() {
  return (
    <ul
      className={css({
        display: "flex",
        gap: "19px",
        "& li": {
          display: "flex",
          alignItems: "center",
          gap: "3px",
        },
      })}
    >
      <li>
        <BsGeoAlt />
        Lorem.
      </li>
      <li>
        <BsGeoAlt />
        Lorem.
      </li>
      <li>
        <BsGeoAlt />
        Lorem.
      </li>
    </ul>
  );
}
