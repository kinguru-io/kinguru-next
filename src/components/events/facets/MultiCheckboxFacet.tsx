import {
  Tag,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Button,
} from "@chakra-ui/react";
import { FacetViewProps } from "@elastic/react-search-ui-views";
import { getFilterValueDisplay } from "@elastic/react-search-ui-views/lib/cjs/view-helpers";
import type { FieldValue } from "@elastic/search-ui";
import React from "react";

export function MultiCheckboxFacet({
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder,
}: FacetViewProps) {
  return (
    <FormControl w={"90%"} m={"auto"} pb={2}>
      <FormLabel>{label}</FormLabel>
      {showSearch && (
        <Checkbox
          display={"block"}
          type="search"
          placeholder={searchPlaceholder || "Search"}
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
      )}

      {options.length < 1 && <div>No matching options</div>}
      {options.map((option) => {
        const checked = option.selected;
        const value = option.value as FieldValue;
        return (
          <Flex
            key={`facet-${option.value}`}
            justifyContent={"space-between"}
            pb={1}
          >
            <Flex alignItems={"center"}>
              <input
                style={{ margin: "3px" }}
                data-transaction-name={`facet-${label}`}
                id={`facet_${label}${getFilterValueDisplay(option.value)}`}
                type="checkbox"
                checked={checked}
                onChange={() => (checked ? onRemove(value) : onSelect(value))}
              />
              <Text display={"inline-block"}>
                {getFilterValueDisplay(option.value)}
              </Text>
            </Flex>
            <Tag>{option.count.toLocaleString("en")}</Tag>
          </Flex>
        );
      })}

      {showMore && <Button onClick={onMoreClick}>+ More</Button>}
    </FormControl>
  );
}

export default MultiCheckboxFacet;
