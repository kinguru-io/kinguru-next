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
};

export default function BookingEmail({
  locale,
  name,
  slotInfo,
  comment,
  donation,
}: BookingEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>You have your reservation at {name}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>Congratulations!</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Text style={paragraph}>
                You have your reservation at{" "}
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
                        from {from} to {to}
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
                    Donation - <b>{priceFormatter.format(donation)}</b>
                  </li>
                )}
              </ul>
              {comment && (
                <Container style={{ marginBottom: "24px", fontSize: "14px" }}>
                  <span style={{ fontWeight: "500" }}>Comment:</span>
                  <br />
                  <span>{comment}</span>
                </Container>
              )}
              <Link href={`${baseUrl}/${locale}/profile/mybookings`}>
                👉 Check your reservations here 👈
              </Link>
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- Eventify Team
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
} satisfies BookingEmailProps;

export async function renderBookingEmail(
  props: BookingEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<BookingEmail {...props} />, { plainText });
}
