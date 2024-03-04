import { PremiseView } from "./PremiseView";
import { VStack } from "~/styled-system/jsx";

export function PremiseListing({
  premiseIdList,
}: {
  premiseIdList: { id: string }[];
}) {
  return (
    <VStack gap="20px" marginBlockStart="50px">
      {premiseIdList.map(({ id }) => (
        <PremiseView key={id} id={id} />
      ))}
    </VStack>
  );
}
