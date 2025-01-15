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

const baseUrl = process.env.SITE_URL;

export type BookingConfirmedEmailProps = {
  locale: string;
  name: string;
  t: (...args: any[]) => string;
};

export default function BookingConfirmedEmail({
  locale,
  name,
  t,
}: BookingConfirmedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {t("booking_confirmed.preview")} [{name}] .
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>{t("booking_confirmed.heading")}</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Text style={paragraph}>
                {t("booking_confirmed.preview")}{" "}
                <span
                  style={{ fontWeight: "bold" }}
                  dangerouslySetInnerHTML={{
                    __html: `[${name.replace(/\s/g, "&nbsp;")}]`,
                  }}
                />
              </Text>
              <Link href={`${baseUrl}/${locale}/profile/mybookings`}>
                {t("booking_confirmed.check_link_label")}
              </Link>
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

BookingConfirmedEmail.PreviewProps = {
  locale: "en",
  name: "Test premise",
  t: (key: string) => `[${key}]`,
} satisfies BookingConfirmedEmailProps;

export async function renderBookingConfirmedEmail(
  props: BookingConfirmedEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<BookingConfirmedEmail {...props} />, { plainText });
}
