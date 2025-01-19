import type { PremiseViewCardProps } from "@/components/premise";
import { token } from "~/styled-system/tokens";

export type PremiseViewData =
  | PremiseViewCardProps["premise"][]
  | "pending"
  | null;

export const lgMediaQuery = `(min-width:${token("breakpoints.lg")})`;

export const initialViewStatePoland = {
  zoom: 6,
  latitude: 52.237049,
  longitude: 21.017532,
} as const;

// [NE longitude, NE latitude, SW longitude, SW latitude]
export const polandBoundingBoxPoints =
  "21.34875138397919,52.39470213944725,20.788018982610225,52.030900066085024";
