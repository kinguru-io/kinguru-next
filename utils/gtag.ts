declare var window: GtagWindow & typeof globalThis;

export const pageview = (url: string) => {
  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const checkout = ({
  value,
  item,
}: {
  value: number;
  item: { name: string; id: string };
}) => {
  return {
    begin: () =>
      window.gtag("event", "begin_checkout", {
        currency: "PLN",
        value,
        items: [{ item_id: item.id, item_name: item.name, price: value }],
      }),
    purchase: (transactionId: string) =>
      window.gtag("event", "purchase", {
        currency: "PLN",
        value,
        transaction_id: transactionId,
        items: [{ item_id: item.id, item_name: item.name, price: value }],
      }),
  };
};
