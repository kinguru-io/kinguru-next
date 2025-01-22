import { ModalWindow } from "@/components/uikit";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Stack } from "~/styled-system/jsx";
import { token } from "~/styled-system/tokens";

const lgMediaQuery = `(min-width:${token("breakpoints.lg")})`;

export function ListingSidebar({
  listingSlot,
}: {
  listingSlot: React.ReactNode;
}) {
  const isAboveLg = useMediaQuery(lgMediaQuery);

  if (!isAboveLg) {
    return <ModalWindow type="drawer-bottom">{listingSlot}</ModalWindow>;
  }

  return (
    <Stack css={{ lg: { width: "65%", overflowY: "auto" } }}>
      {listingSlot}
    </Stack>
  );
}
