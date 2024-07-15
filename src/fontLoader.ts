import { Noto_Sans } from "next/font/google";

export const NotoSans = Noto_Sans({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans",
});
