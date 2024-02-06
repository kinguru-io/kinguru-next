import type { Meta, StoryObj } from "@storybook/react";
import { css } from "~/styled-system/css";
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
        <div className={divider({ color: "neutral.3", my: "4" })} />
        <div>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
        </div>
        <div className={divider({ color: "neutral.3", my: "4" })} />
        <div>
          <p className={css({ textStyle: "body.1" })}>Basic text [body.1]</p>
          <p className={css({ textStyle: "body.2" })}>Basic text [body.2]</p>
          <p className={css({ textStyle: "body.3" })}>Basic text [body.3]</p>
          <p className={css({ textStyle: "body.4" })}>Basic text [body.4]</p>
        </div>
        <div className={divider({ color: "neutral.3", my: "4" })} />
        <div>
          <p className={css({ textStyle: "button.sm" })}>Button [sm]</p>
          <p className={css({ textStyle: "button.md" })}>Button [md]</p>
          <p className={css({ textStyle: "button.lg" })}>Button [lg]</p>
          <p className={css({ textStyle: "button.xl" })}>Button [xl]</p>
        </div>
      </div>
    );
  },
};
