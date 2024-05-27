type MaybeArray<T> = T | T[];

function numericResolver(key: string) {
  return (value: string) => {
    const [gte, lte] = value.split("-");

    return { range: { [key]: { gte, lte } } };
  };
}

const filterParamsResolverMap = {
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
  price: numericResolver("price"),
  area: numericResolver("area"),
  capacity: numericResolver("capacity"),
};

export default function PremiseListingPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const mustFilter = Object.entries(searchParams).reduce(
    (query, [agg, values]) => {
      if (!values) return query;
      if (!(agg in filterParamsResolverMap)) return query;

      const resolver =
        filterParamsResolverMap[agg as keyof typeof filterParamsResolverMap];

      query.push(resolver(values));

      return query;
    },
    [] as Array<Record<string, any>>,
  );

  return (
    <>
      <pre>{JSON.stringify(mustFilter, null, 2)}</pre>
    </>
  );
}
