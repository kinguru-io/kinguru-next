import { PrismaClient } from "@prisma/client";
type Messages = typeof import("./messages/en.json");

declare interface IntlMessages extends Messages {}

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}
