import { useTranslations } from "next-intl";
import type { PremiseViewData } from "./config";
import { SortToggler } from "@/components/filters";
import { PremiseViewCard } from "@/components/premise";
import { Loader } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box, HStack, Stack } from "~/styled-system/jsx";

export function PremiseListing({
  premiseViews,
}: {
  premiseViews: PremiseViewData;
}) {
  const t = useTranslations("search_map");

  if (premiseViews === null || premiseViews.length === 0) {
    return (
      <p
        className={css({
          textAlign: "center",
          marginBlock: "auto",
          color: "secondary",
        })}
      >
        {t("move_map_tip")}
      </p>
    );
  }

  if (premiseViews === "pending") {
    return <Loader className={css({ minHeight: "64" })} />;
  }

  return (
    <Stack css={{ gap: "3" }}>
      <HStack
        css={{
          gap: "2",
          justifyContent: "space-between",
          lgDown: { display: "none" },
        }}
      >
        <span className={css({ fontWeight: "700", flexGrow: "3" })}>
          {t("existing_object")}
        </span>
        <SortToggler replace />
      </HStack>
      <Box
        css={{
          gap: "2",
          display: "flex",
          overflowX: "auto",
          minHeight: "fit-content",
          "& > *": {
            minWidth: "60",
            flexBasis: "full",
          },
          lgDown: {
            maxHeight: "72",
            "& > *": {
              maxWidth: "72",
            },
          },
          lg: {
            gap: "4",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax({spacing.64}, 1fr))",
          },
        }}
      >
        {premiseViews.map((view) => (
          <PremiseViewCard key={view.id} premise={view} />
        ))}
      </Box>
    </Stack>
  );
}
