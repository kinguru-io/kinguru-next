export const defaultSizings = {
  size: 10,
  from: 0,
};

type MaybeArray<T> = T | T[];

function numericResolver(key: string) {
  return (value: string) => {
    const [from, to] = value.split("-");

    return { range: { [key]: { gte: Number(from), lte: Number(to) } } };
  };
}

const filterKeysResolverMap = {
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
  price: numericResolver("minPrice"),
  area: numericResolver("area"),
  capacity: numericResolver("capacity"),
};

function isFilterKey(key: string): key is keyof typeof filterKeysResolverMap {
  return key in filterKeysResolverMap;
}

export function buildQueryParts(searchParams: Record<string, any>) {
  return Object.entries(searchParams).reduce(
    (parts, [key, values]) => {
      if (!values) return parts;

      if (isFilterKey(key)) {
        const resolver = filterKeysResolverMap[key];
        parts.must.push(resolver(values));
      }

      if (key === "sort") {
        parts.sort.push({ minPrice: values });
      }

      if (key === "size") {
        parts.size = Number(values);
      }

      return parts;
    },
    { must: [], sort: [], size: defaultSizings.size } as Record<
      "must" | "sort" | "size",
      any | any[]
    >,
  );
}
