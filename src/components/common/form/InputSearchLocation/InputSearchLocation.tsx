"use client";

import type { SearchBoxSuggestion } from "@mapbox/search-js-core";
import { useLocale } from "next-intl";
import { useState } from "react";
import {
  useController,
  type FieldValues,
  type Control,
  type Path,
  useFormContext,
} from "react-hook-form";
import { DropdownMenu, Input, useDropdown } from "@/components/uikit";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import type { Locale } from "@/navigation";
import { getError } from "@/utils/forms/errors";
import { css } from "~/styled-system/css";

export function InputSearchLocation<T extends FieldValues>({
  placeholder,
  name,
  control,
}: {
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
}) {
  const {
    formState: { errors },
  } = useFormContext();
  const [places, setPlaces] = useState<SearchBoxSuggestion[]>([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const locale = useLocale() as Locale;
  const { fetchSuggestions } = useSearchBoxCore({ language: locale });
  const { setHidden } = useDropdown();
  const { field } = useController<T>({ name, control });

  const inputChanged = (searchValue: string) => {
    setHidden(false);
    setTextFieldValue(searchValue);
    fetchSuggestions(searchValue, setPlaces);
  };

  const suggestionChosen = (suggestion: SearchBoxSuggestion) => {
    setHidden(true);
    setTextFieldValue(suggestion.full_address || suggestion.place_formatted);

    field.onChange(suggestion.mapbox_id);
  };

  return (
    <>
      <input type="text" {...field} hidden readOnly />
      <Input
        type="text"
        placeholder={placeholder}
        value={textFieldValue}
        onChange={(e) => inputChanged(e.target.value)}
        data-invalid={getError(errors, name)}
      />
      <DropdownMenu shouldCloseOnClick={false}>
        {places.map((place) => (
          <button
            key={place.mapbox_id}
            type="button"
            className={css({ textAlign: "start" })}
            onClick={() => suggestionChosen(place)}
          >
            <b>{place.name}</b>
            <address>{place.full_address || place.place_formatted}</address>
          </button>
        ))}
      </DropdownMenu>
    </>
  );
}
