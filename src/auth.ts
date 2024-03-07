import { getServerSession } from "next-auth";
import { adapterOptions } from "@/lib/nextauth/adapterOptions.ts";

export function getSession() {
  return getServerSession(adapterOptions);
}
