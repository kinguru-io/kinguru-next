import { DEFAULT_TAX } from "../shared/constants";

export const priceFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export const priceFormatterWithTax = {
  format: (value: number) => {
    const valueWithTax = value * DEFAULT_TAX;
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    }).format(valueWithTax);
  },
};
