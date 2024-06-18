import { PremiseCollapse } from "./PremiseCollapse";
import { PremiseView } from "./PremiseView";
import { Grid, Stack } from "~/styled-system/jsx";

type PremiseListingProps = {
  premiseIdList: { id: string | undefined }[];
};

export function PremiseListing({ premiseIdList }: PremiseListingProps) {
  const visiblePremiseIdList = premiseIdList.slice(0, 3);
  const hiddenPremiseIdList = premiseIdList.slice(3);

  return (
    <Stack
      gap="20px"
      marginBlockStart="50px"
      css={{ "& > .button": { alignSelf: "center" } }}
    >
      <PremiseStack premiseIdList={visiblePremiseIdList} />
      {hiddenPremiseIdList.length > 0 && (
        <PremiseCollapse>
          <PremiseStack premiseIdList={hiddenPremiseIdList} />
        </PremiseCollapse>
      )}
    </Stack>
  );
}

export function PremiseStack({ premiseIdList }: PremiseListingProps) {
  return (
    <Grid gap="6" gridTemplateColumns={{ base: "1", sm: "2" }}>
      {premiseIdList.map(({ id }) => id && <PremiseView key={id} id={id} />)}
    </Grid>
  );
}
