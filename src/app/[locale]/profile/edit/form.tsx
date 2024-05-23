"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Address, Organization, SocialLink } from "@prisma/client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { useFormState } from "react-dom";
import {
  SubmitHandler,
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import formFieldsConfig from "./formConfig.json";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { BaseForm, Button, Checkbox, SocialLinks } from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";

import { Box, Flex } from "~/styled-system/jsx";

interface EditProfileFormProps {
  companyName: string;
  companyData?: Organization & {
    address: Address[];
    socialLinks: SocialLink[];
  };
  orgRegister: OrgRegisterAction;
}

export function EditProfileForm({
  companyName,
  companyData,
  orgRegister,
}: EditProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const defaultValues = companyData || { name: companyName };

  const methods = useForm<OrgRegisterInput>({
    mode: "all",
    resolver: zodResolver(orgRegisterSchema),
    defaultValues,
  });

  const t = useTranslations("form.common");
  const [response, formAction] = useFormState(orgRegister, null);

  const onSubmit: SubmitHandler<OrgRegisterInput> = useCallback(
    (data) => {
      startTransition(() => formAction(data));
    },
    [formAction],
  );

  useEffect(() => {
    if (!response) return;

    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(t("updated"));
    }
  }, [response]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <OrganizationRegisterFormInner isPending={isPending} />
      </form>
    </FormProvider>
  );
}

const emptyAddressObject: OrgRegisterInput["address"][number] = {
  country: "",
  city: "",
  street: "",
  building: "",
  room: "",
  zipCode: "",
};

function OrganizationRegisterFormInner({ isPending }: { isPending: boolean }) {
  const { setValue, getValues } = useFormContext<OrgRegisterInput>();

  const t = useTranslations("organization.basic_info_form");

  const sameAddressStateChanged = (checked: boolean) => {
    const postAddress = getValues("address.0");

    setValue("address.1", checked ? postAddress : emptyAddressObject);
  };

  return (
    <FormInnerLayout>
      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.main")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <FormColumn>
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.main}
              schema={orgRegisterSchema}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <CompanyImagePicker />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.credentials")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <FormColumn>
            {t("column.business")}
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.credentials.business}
              schema={orgRegisterSchema}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <FormColumn>
            {t("column.bank")}
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.credentials.bank}
              schema={orgRegisterSchema}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <FormColumn>
            {t("column.postAddress")}
            <AddressGroup type="post" />
          </FormColumn>
          <FormColumn>
            {t("column.billingAddress")}
            <AddressGroup type="billing" />
          </FormColumn>
        </OrganizationRegisterFormGroupLayout>
        <Checkbox
          label={t("same_addresses_label")}
          defaultChecked={false}
          onChange={({ target }) => sameAddressStateChanged(target.checked)}
        />
        <span className="helper">{t("credentials_asterisk_helper")}</span>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.social")}</h3>
        <span className="subheading">{t("social_helper")}</span>
        <OrganizationRegisterFormGroupLayout>
          <SocialLinks />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <Button type="submit" size="md" isLoading={isPending}>
        {t("submit")}
      </Button>
    </FormInnerLayout>
  );
}

function AddressGroup({ type }: { type: "post" | "billing" }) {
  const index = type === "post" ? 0 : 1;

  const customFieldName = (field): string => {
    return `address.${index}.${field.name}`;
  };

  return (
    <BaseForm<OrgRegisterInput>
      config={formFieldsConfig.credentials.postAddress}
      schema={orgRegisterSchema}
      customFieldName={customFieldName}
      translationsKey="organization.basic_info_form"
    />
  );
}

function CompanyImagePicker() {
  const {
    control,
    register,
    setValue,
    formState: { defaultValues },
  } = useFormContext<OrgRegisterInput>();
  const src = useWatch({
    control,
    name: "logotype",
    defaultValue: defaultValues?.logotype,
  });

  return (
    <Box
      position="relative"
      css={{
        "& > .button": {
          position: "absolute",
          fontSize: "10px",
          insetBlockStart: "0.3rem",
          insetInlineEnd: "1rem",
        },
      }}
    >
      <ProfileImagePicker
        key={src}
        groupKey="company"
        imageSrc={src || ""}
        {...register("logotype")}
      />
      {src && (
        <Button
          type="button"
          size="iconOnly"
          variant="solid"
          colorPalette="primary"
          onClick={() => setValue("logotype", "")}
          icon={<RxCross1 size="1.7em" />}
        />
      )}
    </Box>
  );
}

function OrganizationRegisterFormBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      layerStyle="outlineSecondaryWrapper"
      paddingInline="30px"
      marginBlockEnd="60px"
      direction="column"
      gap="30px"
      alignItems="center"
      css={{
        "& > .subheading": { marginBlockStart: "-1.5rem", textAlign: "center" },
      }}
    >
      {children}
    </Flex>
  );
}

function OrganizationRegisterFormGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      width="full"
      maxWidth="600px"
      gap="50px"
    >
      {children}
    </Flex>
  );
}

function FormColumn({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction="column"
      gap="20px"
      flexBasis="256px"
      justifyContent="flex-start"
    >
      {children}
    </Flex>
  );
}
