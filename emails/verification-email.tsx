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

type VerificationEmailProps = {
  linkHref: string;
};
export default function VerificationEmail({
  linkHref,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Visit a link to verify your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <HeaderLogo />
          <Heading style={heading}>Email verification</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link href={linkHref}>👉 Click here to verify your email 👈</Link>
            </Text>
            <Text style={paragraph}>
              If you didn't request this, please ignore this email.
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

export async function renderVerificationEmail(
  { linkHref }: VerificationEmailProps,
  plainText?: boolean,
) {
  return renderAsync(<VerificationEmail linkHref={linkHref} />, { plainText });
}
