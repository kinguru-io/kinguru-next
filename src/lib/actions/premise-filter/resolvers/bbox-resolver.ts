/**
 * @description Param `points` is supposed to be `[NE longitude, NE latitude, SW longitude, SW latitude]`
 */
export function boundingBoxResolver(points: number[]) {
  return {
    geo_bounding_box: {
      coordinates: {
        top_right: [points[0], points[1]],
        bottom_left: [points[2], points[3]],
      },
    },
  };
}
