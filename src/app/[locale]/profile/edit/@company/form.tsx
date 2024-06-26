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
} from "react-hook-form";
import toast from "react-hot-toast";
import formFieldsConfig from "./form-config.json";
import { ImagePickerForm } from "@/components/common/form/image-picker-form";
import { BaseForm, Button, Checkbox, SocialLinks } from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";

import { Flex } from "~/styled-system/jsx";

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
  const t = useTranslations("form.common");
  const formT = useTranslations("organization.basic_info_form");

  const methods = useForm<OrgRegisterInput>({
    mode: "all",
    // @ts-expect-error
    resolver: zodResolver(orgRegisterSchema(formT)),
    defaultValues,
  });

  const [response, formAction] = useFormState(orgRegister, null);

  const onSubmit: SubmitHandler<OrgRegisterInput> = useCallback(
    (data) => {
      // @ts-expect-error
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
              // @ts-expect-error
              schema={orgRegisterSchema(t)}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <ImagePickerForm groupKey="company" name="logotype" />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.credentials")}</h3>
        <OrganizationRegisterFormGroupLayout>
          <FormColumn>
            {t("column.business")}
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.credentials.business}
              // @ts-expect-error
              schema={orgRegisterSchema(t)}
              translationsKey="organization.basic_info_form"
            />
          </FormColumn>
          <FormColumn>
            {t("column.bank")}
            <BaseForm<OrgRegisterInput>
              config={formFieldsConfig.credentials.bank}
              // @ts-expect-error
              schema={orgRegisterSchema(t)}
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
          <FormRow>
            <Checkbox
              label={t("same_addresses_label")}
              defaultChecked={false}
              onChange={({ target }) => sameAddressStateChanged(target.checked)}
            />
            <span className="helper">{t("credentials_asterisk_helper")}</span>
          </FormRow>
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("group.social")}</h3>
        <span className="subheading">{t("social_helper")}</span>
        <OrganizationRegisterFormGroupLayout>
          <SocialLinks role="organization" />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <Button type="submit" isLoading={isPending}>
        {t("submit")}
      </Button>
    </FormInnerLayout>
  );
}

function AddressGroup({ type }: { type: "post" | "billing" }) {
  const t = useTranslations("organization.basic_info_form");
  const index = type === "post" ? 0 : 1;

  const customFieldName = (field: { name: string }): string => {
    return `address.${index}.${field.name}`;
  };

  return (
    <BaseForm<OrgRegisterInput>
      config={formFieldsConfig.credentials.postAddress}
      // @ts-expect-error
      schema={orgRegisterSchema(t)}
      customFieldName={customFieldName}
      translationsKey="organization.basic_info_form"
    />
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
      flexGrow="1"
      justifyContent="flex-start"
    >
      {children}
    </Flex>
  );
}

function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction="column"
      flexGrow="1"
      justifyContent="flex-start"
      gap="25px"
    >
      {children}
    </Flex>
  );
}
