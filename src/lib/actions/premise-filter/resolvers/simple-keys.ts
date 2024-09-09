function numericResolver(key: string) {
  return (value: string) => {
    const [from, to] = value.split("-");

    return { range: { [key]: { gte: Number(from), lte: Number(to) } } };
  };
}

function plainStringResolver(key: string) {
  return (value: string) => ({ term: { [key]: value } });
}

type MaybeArray<T> = T | T[];

export const filterKeysResolverMap = {
  amenities: (terms: MaybeArray<string>) => ({
    terms_set: {
      amenities: {
        terms: Array.isArray(terms) ? terms : [terms],
        minimum_should_match_script: { source: "params.num_terms" },
      },
    },
  }),
  type: (type: MaybeArray<string>) => ({
    terms: { type: Array.isArray(type) ? type : [type] },
  }),
  city: plainStringResolver("location.city.keyword"),
  countryCode: plainStringResolver("location.countryCode.keyword"),
  price: numericResolver("minPrice"),
  area: numericResolver("area"),
  capacity: numericResolver("capacity"),
};

export function isFilterKey(
  key: string,
): key is keyof typeof filterKeysResolverMap {
  return key in filterKeysResolverMap;
}
