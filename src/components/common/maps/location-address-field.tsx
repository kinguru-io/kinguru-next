import { Icon } from "@/components/uikit";
import { retrieveLocationPropertiesById } from "@/searchBox";
import { css } from "~/styled-system/css";

export async function LocationAddressField({
  locationId,
  fallback,
}: {
  locationId: string;
  fallback?: React.ReactNode;
}) {
  const response = await retrieveLocationPropertiesById(locationId);

  if (!response) return <>{fallback}</>;

  const { full_address, address } = response;

  return (
    <>
      <Icon name="common/location-star" />
      <address>{full_address || address}</address>
    </>
  );
}

export function LocationAddressFallback({ label }: { label: string }) {
  return (
    <>
      <Icon name="action/cross" /> {label}
    </>
  );
}

export function LinkToMap({
  mapId,
  children,
  colored,
}: {
  mapId?: string;
  children?: React.ReactNode;
  colored?: boolean;
}) {
  const NodeTag = mapId ? "a" : "span";

  return (
    <NodeTag
      {...(mapId && { href: "#" + mapId })}
      className={css({
        display: "flex",
        alignItems: "center",
        gap: "1",
        fontSize: "px13",
        "& > svg": {
          fontSize: "1.5em",
          color: "colorPalette",
          flexShrink: "0",
        },
        md: { fontSize: "md" },
        _hoverOrFocusVisible: {
          color: "colorPalette",
          textDecoration: "underline",
        },
        "&[data-colored]": { colorPalette: "primary" },
      })}
      data-colored={colored}
    >
      {children}
    </NodeTag>
  );
}
