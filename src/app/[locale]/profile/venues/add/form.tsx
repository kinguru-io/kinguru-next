"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SearchBoxSuggestion } from "@mapbox/search-js-core";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  type UseFormRegister,
  type UseFormReturn,
  type UseFormSetValue,
  useForm,
} from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import {
  AccordionGroup,
  Button,
  Dropdown,
  DropdownMenu,
  Input,
  Textarea,
  useDropdown,
} from "@/components/uikit";
import { useSearchBoxCore } from "@/hooks/mapbox/useSearchBoxCore";
import { type CreateVenueInput, createVenueSchema } from "@/lib/actions/venue";
import type { Locale } from "@/navigation";
import { Box, InlineBox, VStack } from "~/styled-system/jsx";

export function AddVenueForm() {
  const {
    register,
    formState: { isValid, dirtyFields },
    setValue,
  } = useForm<CreateVenueInput>({
    mode: "onChange",
    resolver: zodResolver(createVenueSchema),
  });

  return (
    <form action={console.log}>
      <AddVenueFormInner
        register={register}
        setValue={setValue}
        isValid={isValid}
        dirtyFields={dirtyFields}
      />
    </form>
  );
}

function AddVenueFormInner({
  register,
  setValue,
  isValid,
  dirtyFields,
}: {
  register: UseFormRegister<CreateVenueInput>;
  setValue: UseFormSetValue<CreateVenueInput>;
  isValid: boolean;
  dirtyFields: UseFormReturn<CreateVenueInput>["formState"]["dirtyFields"];
}) {
  const { pending } = useFormStatus();
  const t = useTranslations("profile.venues.add");

  const formGroupItems = [
    {
      title: t("groups.main_info"),
      content: (
        <VStack
          gap="20px"
          css={{
            "& span": {
              textStyle: "heading.6",
              color: "neutral.0",
              marginBlockStart: "10px",
            },
          }}
        >
          <span>{t("fields.name")}</span>
          <Input
            placeholder={t("fields.name_placeholder")}
            {...register("name")}
          />
          <span>{t("fields.description")}</span>
          <Textarea
            placeholder={t("fields.description_placeholder")}
            rows={9}
            {...register("description")}
          />
        </VStack>
      ),
      isNextBtnDisabled: !(dirtyFields.name && dirtyFields.description),
    },
    {
      title: t("groups.photo"),
      content: (
        <VStack gap="30px" marginBlockEnd="20px">
          <p>{t("fields.photo_tip")}</p>
          <ProfileImagePicker
            groupKey="venues"
            placeholderWrapper="rectangle"
            {...register("image")}
          />
        </VStack>
      ),
      isNextBtnDisabled: !dirtyFields.image,
    },
    {
      title: t("groups.location"),
      content: (
        <VStack gap="20px">
          <Dropdown size="full">
            <SearchLocation
              setValue={setValue}
              name="locationMapboxId"
              placeholder={t("fields.locationMapboxId_placeholder")}
            />
          </Dropdown>
          <p>{t("fields.locationTutorial_tip")}</p>
          <Textarea
            placeholder={t("fields.locationTutorial_placeholder")}
            rows={9}
            {...register("locationTutorial")}
          />
        </VStack>
      ),
      isNextBtnDisabled: !(
        dirtyFields.locationMapboxId && dirtyFields.locationTutorial
      ),
    },
  ];

  return (
    <Box
      css={{ "& .button": { marginInline: "auto", marginBlockStart: "20px" } }}
    >
      <AccordionGroup
        items={formGroupItems}
        btnLabel={t("next_group_btn_label")}
      />
      <Button type="submit" size="md" isLoading={pending} disabled={!isValid}>
        {t("submit_btn_label")}
      </Button>
    </Box>
  );
}

function SearchLocation({
  name,
  placeholder,
  setValue,
}: {
  name: keyof CreateVenueInput;
  placeholder: string;
  setValue: UseFormSetValue<CreateVenueInput>;
}) {
  const [places, setPlaces] = useState<SearchBoxSuggestion[]>([]);
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const locale = useLocale() as Locale;
  const { fetchSuggestions } = useSearchBoxCore({ language: locale });
  const { setHidden } = useDropdown();

  const inputChanged = (searchValue: string) => {
    setHidden(false);
    setTextFieldValue(searchValue);
    fetchSuggestions(searchValue, setPlaces);
  };

  const suggestionClicked = (suggestion: SearchBoxSuggestion) => {
    setHidden(true);
    setTextFieldValue(suggestion.full_address || suggestion.place_formatted);

    setValue(name, suggestion.mapbox_id, { shouldDirty: true });
  };

  return (
    <>
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
