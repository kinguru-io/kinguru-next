"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePremisePage() {
  revalidatePath("/[locale]/premise/[slug]", "page");
}

export type RevalidatePremisePage = typeof revalidatePremisePage;
