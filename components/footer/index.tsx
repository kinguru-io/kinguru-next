import { Container, SimpleGrid, VStack, Link } from "@chakra-ui/react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { useLocale } from "@/utils/use-locale";

export const FooterSection = () => {
  const { t } = useLocale();
  return (
    <Container maxW={"full"} bgColor={"brand.secondary"} py={10}>
      <SimpleGrid columns={[2, 5]} maxWidth={"5xl"} mx={"auto"}>
        <VStack py={5} justifyContent={"center"}>
          <Image src="/img/logo_header.svg" alt="" width={80} height={73} />
          <Image
            src="/img/logo_header_text.svg"
            alt=""
            width={105}
            height={24}
          />
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href={"tel:+48792665092"}>+48792665092</Link>
          <Link href={"mailto:t.yarosh@kinguru.io"}>t.yarosh@kinguru.io</Link>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href={"https://www.facebook.com/kinguru.online/"} isExternal>
            <FaFacebook style={{ display: "inline", fontSize: "13px" }} />{" "}
            facebook
          </Link>
          <Link href={"https://www.linkedin.com/"} isExternal>
            <FaLinkedin style={{ display: "inline", fontSize: "13px" }} />{" "}
            linkedin
          </Link>
          <Link href={"https://www.instagram.com/kinguru.online/"} isExternal>
            <FaInstagram style={{ display: "inline", fontSize: "13px" }} />{" "}
            instagram
          </Link>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href="/#events">{t("footer.upcoming_events")}</Link>
          <Link href="/#how_it_works">{t("footer.how_it_works")}</Link>
          <Link href="/#events">{t("footer.reviews")}</Link>
        </VStack>
        <VStack
          color={"gray.100"}
          py={5}
          alignItems={["center", "baseline"]}
          justifyContent={"center"}
        >
          <Link href="/privacy-policy">{t("footer.privacy_policy")}</Link>
          <Link href="/#">{t("footer.photo_reports")}</Link>
          <Link href="/#">{t("footer.contacts")}</Link>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};
