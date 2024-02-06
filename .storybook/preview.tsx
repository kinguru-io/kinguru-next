import "../src/app/globals.css";

import React from 'react';
import type { Preview } from "@storybook/react";
import { NotoSans } from "@/fontLoader.ts";
import { css } from "~/styled-system/css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <main className={css({ fontFamily: 'noto' })}>
        <style>
          {`
            :root {
              --font-noto-sans: ${NotoSans.style.fontFamily};
            }
          `}
        </style>
        <Story />
      </main>
    ),
  ],
};

export default preview;
