"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { User, UserSocialLink } from "@prisma/client";
import { formatISO, isFuture, toDate, format } from "date-fns";
import { useTranslations } from "next-intl";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import formConfig from "./form-config.json";
import { SingleDayPicker } from "@/components/common/cards/single-day-picker";
import { ImagePickerForm } from "@/components/common/form/image-picker-form";
import {
  BaseForm,
  Button,
  Dropdown,
  DropdownInitiator,
  DropdownMenu,
  ErrorField,
  Input,
  SocialLinks,
} from "@/components/uikit";
import type { UpdateUserProfileAction } from "@/lib/actions";
import {
  userProfileSchema,
  type UserProfileInput,
} from "@/lib/validations/auth/user-profile";
import { Flex } from "~/styled-system/jsx";

export function EditUserProfileForm({
  userData: {
    image,
    firstname,
    lastname,
    email,
    phoneNumber,
    country,
    city,
    birthdate,
    description,
    socialLinks,
  },
  updateProfile,
}: {
  userData: User & { socialLinks: Pick<UserSocialLink, "network" | "url">[] };
  updateProfile: UpdateUserProfileAction;
}) {
  const formT = useTranslations("user.basic_info_form");
  const t = useTranslations("form.common");
  const methods = useForm<UserProfileInput>({
    mode: "all",
    // @ts-expect-error
    resolver: zodResolver(userProfileSchema(formT)),
    defaultValues: {
      image,
      firstname: firstname || "",
      lastname: lastname || "",
      email,
      phoneNumber: phoneNumber || "",
      country: country || "",
      city,
      birthdate: birthdate ? birthdate.toISOString() : "",
      description,
      socialLinks,
    },
  });

  const formSubmitted = async (data: UserProfileInput) => {
    const response = await updateProfile(data);

    if (response === null) {
      toast.success(t("updated"));
      return;
    }

    toast.error(response.message);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(formSubmitted)}>
        <EditUserProfileFormInner />
      </form>
    </FormProvider>
  );
}

function EditUserProfileFormInner() {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  const t = useTranslations("user.basic_info_form");

  return (
    <Flex direction="column" gap="20px">
      <Flex
        direction="column"
        gap="20px"
        flexBasis="256px"
        justifyContent="flex-start"
      >
        <BaseForm<UserProfileInput>
          config={formConfig.main}
          // @ts-expect-error
          schema={userProfileSchema(t)}
          translationsKey="user.basic_info_form"
        />
        <DateDropdown name="birthdate" placeholder={t("birthdate")} />
        <ImagePickerForm groupKey="user-profile" name="image" />
      </Flex>
      <SocialLinks role="user" />
      <Button type="submit" size="md" isLoading={isSubmitting} centered>
        {t("submit")}
      </Button>
    </Flex>
  );
}

function DateDropdown({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { field } = useController({ name, control });

  const dayChanged = (day: Date) => {
    field.onChange(formatISO(day, { representation: "date" }));
  };

  return (
    <Dropdown size="auto" anchor="start">
      <DropdownInitiator>
        <Input
          placeholder={placeholder}
          value={field.value ? format(field.value, "dd.MM.yyyy") : ""}
          readOnly
          data-invalid={errors[name]}
        />
        <ErrorField error={errors[name]} />
      </DropdownInitiator>
      <DropdownMenu likeList={false} shouldCloseOnClick={false}>
        <SingleDayPicker
          date={toDate(field.value)}
          callback={dayChanged}
          disabled={isFuture}
          captionLayout="dropdown-buttons"
        />
      </DropdownMenu>
    </Dropdown>
  );
}
