import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ELASTICSEARCH_URL: z.string().url(),
    ELASTICSEARCH_API_KEY: z.string(),
  },
  client: {},
  experimental__runtimeEnv: {},
});
