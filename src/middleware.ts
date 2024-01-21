import createMiddleware from "next-intl/middleware";
import { locales } from "@/navigation.ts";

export default createMiddleware({
  locales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
