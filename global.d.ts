import { PrismaClient } from "@prisma/client";

type Messages =
& typeof import("./public/locales/en/common.json")
& typeof import("./public/locales/ru/common.json")
& typeof import("./public/locales/pl/common.json");

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
  interface GtagWindow extends Window {
    gtag: any;
  }
  interface IntlMessages extends Messages {}
}

declare var window: GtagWindow & typeof globalThis;
