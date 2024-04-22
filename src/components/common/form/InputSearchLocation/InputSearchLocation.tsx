"use client";

import type { SearchBoxSuggestion } from "@mapbox/search-js-core";
import { useLocale } from "next-intl";
import { useState } from "react";
import {
  useController,
  type FieldValues,
  type Control,
  type Path,
} from "react-hook-form";
import { DropdownMenu, Input, useDropdown } from "@/components/uikit";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import type { Locale } from "@/navigation";
import { InlineBox } from "~/styled-system/jsx";

export function InputSearchLocation<T extends FieldValues>({
  placeholder,
  name,
  control,
}: {
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
}) {
  const [places, setPlaces] = useState<SearchBoxSuggestion[]>([]);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const locale = useLocale() as Locale;
  const { fetchSuggestions } = useSearchBoxCore({ language: locale });
  const { setHidden } = useDropdown();
  const { field } = useController<T>({ name, control });

  const inputChanged = (searchValue: string) => {
    setHidden(false);
    setTextFieldValue(searchValue);
    fetchSuggestions(searchValue, setPlaces);
  };

  const suggestionClicked = (suggestion: SearchBoxSuggestion) => {
    setHidden(true);
    setTextFieldValue(suggestion.full_address || suggestion.place_formatted);

    field.onChange(suggestion.mapbox_id);
  };

  return (
    <>
      <input type="text" {...field} hidden />
      <Input
        type="text"
        placeholder={placeholder}
        value={textFieldValue}
        onChange={(e) => inputChanged(e.target.value)}
      />
      <DropdownMenu shouldCloseOnClick={false}>
        {places.map((place) => (
          <InlineBox
            key={place.mapbox_id}
            onClick={() => suggestionClicked(place)}
          >
            <b>{place.name}</b>
            <address>{place.full_address || place.place_formatted}</address>
          </InlineBox>
        ))}
      </DropdownMenu>
    </>
  );
}
