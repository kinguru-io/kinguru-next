import Image from "next/image";
import { Link } from "@/navigation";
import logo from "~/public/img/logotypes/footer-logotype.svg";
import { css } from "~/styled-system/css";
import { Container } from "~/styled-system/jsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      paddingBlock="10"
      css={{
        "& h1": { fontSize: "2xl", fontWeight: "bold" },
        "& ul": { marginBlock: "2" },
        "& li": { listStyle: "inside" },
        "& a": {
          fontWeight: "bold",
          _hover: { textDecoration: "underline" },
        },
      }}
    >
      <Link
        href="/"
        className={css({
          display: "inline-block",
          width: "full",
          "& > img": { margin: "auto" },
        })}
      >
        <Image src={logo} alt="EVENTIFY" width="150" height="150" unoptimized />
      </Link>
      <section
        className={css({
          marginBlock: "5",
          "& > h2": { fontSize: "lg", fontWeight: "bold" },
          "& > p": { marginBlock: "2" },
        })}
      >
        <h2>Contact Us</h2>
        <p>Don't hesitate to contact us if you have any questions.</p>
        <ul>
          <li>
            Via Email:{" "}
            <a href="mailto:t.yarosh@eventify.today">t.yarosh@eventify.today</a>
          </li>
          <li>
            Via Phone Number: <a href="tel:+48792665092">+48792665092</a>
          </li>
        </ul>
      </section>
      {children}
    </Container>
  );
}
