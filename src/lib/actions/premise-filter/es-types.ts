export type Bucket = {
  key: string;
  doc_count: number;
};

export type TermsAgg = {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: Bucket[];
};

export type GlobalAgg = {
  doc_count: number;
  min: { value: number };
  max: { value: number };
};

export type ElasticAggs<T> = {
  aggregations: {
    [Key in keyof T]?: "terms" extends keyof T[Key]
      ? TermsAgg
      : "global" extends keyof T[Key]
        ? GlobalAgg
        : never;
  };
};
