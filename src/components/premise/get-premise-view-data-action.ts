"use server";

import { getPremiseViewData } from "./get-premise-view-data";

export async function getPremiseViewDataAction(id: string) {
  const premise = await getPremiseViewData(id);

  return premise;
}
