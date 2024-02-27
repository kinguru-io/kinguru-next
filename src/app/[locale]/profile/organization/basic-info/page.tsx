import { useTranslations } from "next-intl";
import { BasicInfoForm } from "./form";
import { css } from "~/styled-system/css";
import { Grid, GridItem } from "~/styled-system/jsx";

export default function OrganizationBasicInfoPage() {
  const t = useTranslations("organization.basic_info_page");

  return (
    <Grid
      columnGap="1.25rem"
      rowGap="70px"
      gridTemplateColumns="repeat(6, 1fr)"
      gridTemplateRows="repeat(2, auto)"
    >
      <GridItem
        gridRow="1 / 2"
        gridColumn="1 / -1"
        justifySelf="center"
        textAlign="center"
      >
        <h1 className={css({ textStyle: "heading.2" })}>{t("heading")}</h1>
      </GridItem>
      <GridItem gridColumn="2 / -2" gridRow="2" marginInline="-1.25rem">
        <BasicInfoForm />
      </GridItem>
    </Grid>
  );
}
