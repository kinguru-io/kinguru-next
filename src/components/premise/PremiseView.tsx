import { getPremiseViewData } from "./get-premise-view-data";
import { PremiseViewCard } from "./premise-view-card";

export async function PremiseView({ id, href }: { id: string; href?: string }) {
  const premise = await getPremiseViewData(id);

  if (!premise) {
    return null;
  }

  return <PremiseViewCard premise={premise} href={href} />;
}
