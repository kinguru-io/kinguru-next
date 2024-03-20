"use server";

import { revalidatePath } from "next/cache";

export async function refreshOrderAction() {
  revalidatePath("/[locale]/events/[slug]", "page");
}

export type RefreshOrderAction = typeof refreshOrderAction;
