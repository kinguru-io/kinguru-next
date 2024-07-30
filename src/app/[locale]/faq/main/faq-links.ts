import type { UrlObject } from "url";
import type { NestedKeyOf } from "next-intl";

export type FAQLink = {
  href: string | UrlObject;
  labelIntlCode: NestedKeyOf<IntlMessages["faq"]["main"]["pages"]>;
  segment: string;
};

export const faqLinks: FAQLink[] = [
  {
    href: "/faq/main/site-registration",
    labelIntlCode: "site-registration",
    segment: "site-registration",
  },
  {
    href: "/faq/main/company-registration",
    labelIntlCode: "company-registration",
    segment: "company-registration",
  },
  {
    href: "/faq/main/add-venues",
    labelIntlCode: "add-venues",
    segment: "add-venues",
  },
  {
    href: "/faq/main/add-halls",
    labelIntlCode: "add-halls",
    segment: "add-halls",
  },
  {
    href: "/faq/main/bookings-and-payments",
    labelIntlCode: "bookings-and-payments",
    segment: "bookings-and-payments",
  },
];
