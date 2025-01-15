// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
// eslint-disable-next-line import/no-extraneous-dependencies
import { renderAsync } from "@react-email/render";
import { formatInTimeZone } from "date-fns-tz";
import React from "react";
import {
  alert,
  body,
  container,
  footer,
  heading,
  hr,
  main,
  paragraph,
} from "./base-styles";
import { FooterLogo, HeaderLogo } from "./logos";
import { priceFormatter } from "@/lib/utils";

const baseUrl = process.env.SITE_URL;

export type BookingEmailProps = {
  locale: string;
  slotInfo: { startTime: Date; endTime: Date; amount: number }[];
  name: string;
  comment?: string;
  donation: number;
  withConfirmation?: boolean;
  isCompany?: boolean;
  t: (...args: any[]) => string;
};

export default function BookingEmail({
  locale,
  name,
  slotInfo,
  comment,
  donation,
  withConfirmation,
  isCompany,
  t,
}: BookingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {t("booking.preview")} {name}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>{t("booking.heading")}</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Text style={paragraph}>
                {t("booking.preview")}{" "}
                <span
                  style={{ fontWeight: "bold" }}
                  dangerouslySetInnerHTML={{
                    __html: name.replace(/\s/g, "&nbsp;"),
                  }}
                />
              </Text>
              <ul>
                {slotInfo.map(({ startTime, endTime, amount }) => {
                  const day = formatInTimeZone(startTime, "UTC", "dd.MM.yyyy");
                  const from = formatInTimeZone(startTime, "UTC", "HH:mm");
                  const to = formatInTimeZone(endTime, "UTC", "HH:mm");

                  return (
                    <React.Fragment key={startTime.toISOString()}>
                      <li style={{ fontSize: "14px" }}>
                        <span style={{ fontWeight: "700" }}>{day}</span>
                        <br />
                        {t("from_label")} {from} {t("to_label")} {to}
                        {amount !== 0 && (
                          <span
                            style={{ fontWeight: "bold", marginLeft: "6px" }}
                          >
                            - {priceFormatter.format(amount / 100)}
                          </span>
                        )}
                      </li>
                      <br />
                    </React.Fragment>
                  );
                })}
                {donation > 0 && (
                  <li style={{ fontSize: "14px" }}>
                    {t("donation_label")} -{" "}
                    <b>{priceFormatter.format(donation)}</b>
                  </li>
                )}
              </ul>
              {comment && (
                <Container style={{ marginBottom: "24px", fontSize: "14px" }}>
                  <span style={{ fontWeight: "500" }}>
                    {t("comment_label")}:
                  </span>
                  <br />
                  <span>{comment}</span>
                </Container>
              )}
              <Link href={`${baseUrl}/${locale}/profile/mybookings`}>
                {t("booking.check_link_label")}
              </Link>
              {withConfirmation && (
                <Text style={alert}>
                  {isCompany
                    ? t("booking.confirmation_company_label")
                    : t("booking.confirmation_user_label")}
                </Text>
              )}
            </Text>
          </Section>
          <Text style={paragraph}>
            {t("author_remark")}
            <br />— {t("brand_label")}
          </Text>
          <Hr style={hr} />
          <FooterLogo />
          <Text style={footer}>© {new Date().getFullYear()} Eventify</Text>
        </Container>
      </Body>
    </Html>
  );
}

BookingEmail.PreviewProps = {
  locale: "en",
  slotInfo: [
    {
      startTime: new Date("2024-07-31T11:00:00Z"),
      endTime: new Date("2024-07-31T12:00:00Z"),
      amount: 10000,
    },
    {
      startTime: new Date("2024-07-31T15:00:00Z"),
      endTime: new Date("2024-07-31T16:00:00Z"),
      amount: 10000,
    },
  ],
  donation: 50,
  name: "Test premise",
  comment: "The quick brown fox jumps over the lazy dog",
  // withConfirmation: true,
  t: (key: string) => `[${key}]`,
} satisfies BookingEmailProps;

export async function renderBookingEmail(
  props: BookingEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<BookingEmail {...props} />, { plainText });
}
