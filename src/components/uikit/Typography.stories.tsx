import type { Meta, StoryObj } from "@storybook/react";
import { css } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";
import { divider } from "~/styled-system/patterns";

const meta: Meta = { title: "Typography" };

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <ul>
          <li>
            <b>Typeface:</b> Noto Sans
          </li>
          <li>
            <b>Weights:</b> 400 (normal), <b>700 (bold)</b>
          </li>
        </ul>
        <div className={divider({ color: "secondary.lighter", my: "4" })} />
        <Flex flexWrap="wrap" gap="50px">
          <div>
            <h1>Heading [heading.1]</h1>
            <h2>Heading [heading.2]</h2>
            <h3>Heading [heading.3]</h3>
            <h4>Heading [heading.4]</h4>
            <h5>Heading [heading.5]</h5>
            <span className={css({ textStyle: "heading.6" })}>Heading 6</span>
          </div>
          <div>
            <span className={css({ textStyle: "heading.extra.1" })}>
              Heading [heading.extra.1]
            </span>
          </div>
        </Flex>
        <div className={divider({ color: "secondary.lighter", my: "4" })} />
        <Flex flexWrap="wrap" gap="50px">
          <div>
            <p className={css({ textStyle: "body.1" })}>Basic text [body.1]</p>
            <p className={css({ textStyle: "body.2" })}>Basic text [body.2]</p>
            <p className={css({ textStyle: "body.3" })}>Basic text [body.3]</p>
            <p className={css({ textStyle: "body.4" })}>Basic text [body.4]</p>
          </div>
          <div>
            <p className={css({ textStyle: "body.extra.3" })}>
              Basic text [body.extra.3]
            </p>
          </div>
        </Flex>
        <div className={divider({ color: "secondary.lighter", my: "4" })} />
        <div>
          <p className={css({ textStyle: "button.sm" })}>Button [button.sm]</p>
          <p className={css({ textStyle: "button.md" })}>Button [button.md]</p>
          <p className={css({ textStyle: "button.lg" })}>Button [button.lg]</p>
          <p className={css({ textStyle: "button.xl" })}>Button [button.xl]</p>
        </div>
      </div>
    );
  },
};
