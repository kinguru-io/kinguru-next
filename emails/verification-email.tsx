import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { renderAsync } from "@react-email/render";

type VerificationEmailProps = {
  linkHref: string;
};

const baseUrl = process.env.SITE_URL;

export default function VerificationEmail({
  linkHref,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Visit a link to verify your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Link href={baseUrl}>
            <Img
              src={`${baseUrl}/img/logotypes/header-logotype-109x40.png`}
              width={109}
              height={40}
              alt="Eventify"
            />
          </Link>
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
          <Link href={baseUrl}>
            <Img
              src={`${baseUrl}/img/logotypes/footer-logotype-52x52.png`}
              width={52}
              height={52}
              alt="Eventify"
            />
          </Link>
          <Text style={footer}>© {new Date().getFullYear()} Eventify</Text>
        </Container>
      </Body>
    </Html>
  );
}

export async function renderVerificationEmail({
  linkHref,
}: VerificationEmailProps) {
  return renderAsync(<VerificationEmail linkHref={linkHref} />);
}

const main = {
  color: "#212529", // colors.dark
  backgroundColor: "#ffffff", // colors.light
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#D9D9D9", // colors.tertiary
  marginTop: "48px",
};

const footer = {
  color: "#7A7A7A", // colors.secondary
  fontSize: "12px",
  marginLeft: "4px",
};
