type MaybeArray<T> = T | T[];

function numericResolver(key: string) {
  return (value: string) => {
    const [from, to] = value.split("-");

    return { range: { [key]: { gte: Number(from), lte: Number(to) } } };
  };
}

const searchQueryResolverMap = {
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

export function buildQueryParts(searchParams: Record<string, any>) {
  return Object.entries(searchParams).reduce(
    (parts, [agg, values]) => {
      if (!values) return parts;
      if (!(agg in searchQueryResolverMap)) {
        if (agg === "sort") {
          parts.sort.push({ minPrice: values });
        }

        return parts;
      }

      const resolver =
        searchQueryResolverMap[agg as keyof typeof searchQueryResolverMap];

      parts.must.push(resolver(values));

      return parts;
    },
    { must: [], sort: [] } as Record<"must" | "sort", any[]>,
  );
}
