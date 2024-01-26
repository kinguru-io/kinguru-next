import "../src/app/globals.css";

import type { Preview } from "@storybook/react";
import { NotoSans } from "@/fontLoader.ts";

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
      <main>
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
