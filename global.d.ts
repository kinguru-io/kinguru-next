import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
  interface GtagWindow extends Window {
    gtag: any;
  }
}

declare var window: GtagWindow & typeof globalThis;
