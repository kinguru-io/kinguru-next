import { PrismaClient } from "@prisma/client";

type Messages = typeof import("./public/locales/en/common.json");

declare global {
  namespace globalThis {
    var prisma: PrismaClient;
  }

  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }

  interface GtagWindow extends Window {
    gtag: any;
  }

  interface IntlMessages extends Messages {}

  interface Window extends GtagWindow {
    googleTranslateElementInit: () => void;
    google?: {
      translate?: {
        TranslateElement: new (options: object, containerId: string) => void;
      };
    };
  }
}

export {};
