export function prepareSocialLinks<T extends { url?: string; network: string }>(
  links: T[],
) {
  return links.filter(({ url }) => url) as Array<
    Pick<T, "network"> & { url: string }
  >;
}
