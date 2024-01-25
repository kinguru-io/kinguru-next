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
      <main className={NotoSans.variable}>
        <Story />
      </main>
    ),
  ],
};

export default preview;
