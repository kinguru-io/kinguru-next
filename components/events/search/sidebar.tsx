import { Box, BoxProps, CloseButton, Flex } from "@chakra-ui/react";
import { Facet } from "@elastic/react-search-ui";
import Image from "next/image";
import Link from "next/link";
import { MultiCheckboxFacet } from "@/components/events/facets";
import { useLocale } from "@/utils/use-locale.ts";

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { t } = useLocale();
  return (
    <Box
      transition="3s ease"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box as={Link} mx={"auto"} href={"/"}>
          <Image
            src={"/img/logo_header.png"}
            width={112}
            height={72}
            alt={t("company")}
          />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Facet
        field={"tags.keyword"}
        label={t("events.search_tags")}
        view={MultiCheckboxFacet}
      />
      <Facet
        field={"starts"}
        label={t("events.search_starts")}
        view={MultiCheckboxFacet}
      />
      <Facet
        field={"price"}
        label={t("events.search_price")}
        view={MultiCheckboxFacet}
      />
    </Box>
  );
};
