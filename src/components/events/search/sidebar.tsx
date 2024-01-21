import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { Facet, Sorting } from "@elastic/react-search-ui";
import NextImage from "next/image";
import { useTranslations } from "next-intl";
import { MultiCheckboxFacet } from "@/components/events/facets";
import { Link } from "@/navigation.ts";
import headerLogo from "~/public/img/logo_header.png";

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const t = useTranslations();
  const SORT_OPTIONS = [
    {
      name: t("events.sort_by_relevance"),
      value: [],
    },
    {
      name: t("events.sort_by_start_date"),
      value: [
        {
          field: "starts",
          direction: "asc",
        },
      ],
    },
  ];
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
          <NextImage
            src={headerLogo}
            alt={t("company")}
            width={110}
            priority={true}
          />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Sorting
        label={t("events.sorting")}
        sortOptions={SORT_OPTIONS}
        view={(props) => {
          return (
            <FormControl w={"90%"} m={"auto"} pb={2}>
              <Select
                placeholder={props.label}
                onChange={(event) => {
                  if (event?.target?.value !== "") {
                    props.onChange(event?.target?.value);
                  }
                }}
              >
                {props.options.map((option) => (
                  <option
                    key={option.value}
                    data-transaction-name={"sorting"}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          );
        }}
      />
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
