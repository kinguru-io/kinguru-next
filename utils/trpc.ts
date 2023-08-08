import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import SuperJSON from "superjson";
import { appRouter } from "@/server/routers/_app";

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<typeof appRouter>({
  config({ ctx }) {
    return {
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,

          // You can pass any HTTP headers you wish here
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
});
