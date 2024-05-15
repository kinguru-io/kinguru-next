/* eslint-disable prettier/prettier */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { memo, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import formFieldsConfig from "./formConfig.json";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import {
  Button,
  Select,
  Input,
  Textarea,
  ErrorField,
} from "@/components/uikit";
import { FormInnerLayout } from "@/layout/block";
import { OrgRegisterAction } from "@/lib/actions/auth";
import { AuthFormState } from "@/lib/utils";
import { OrgRegisterInput, orgRegisterSchema } from "@/lib/validations";
import { Flex } from "~/styled-system/jsx";

export function OrganizationRegisterForm({
  orgRegister,
}: {
  orgRegister: OrgRegisterAction;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<OrgRegisterInput>({
    mode: "onBlur",
    resolver: zodResolver(orgRegisterSchema),
  });
  const [_state, formAction] = useFormState<AuthFormState, FormData>(
    orgRegister,
    null,
  );

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<OrgRegisterInput> = () =>
    formRef.current?.submit();

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} action={formAction}>
      <OrganizationRegisterFormInner
        register={register}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </form>
  );
}

function OrganizationRegisterFormInner({
  register,
  isSubmitting,
  errors,
}: {
  register: UseFormRegister<OrgRegisterInput>;
  isSubmitting: boolean;
  errors: any; // Type the errors object according to your schema
}) {
  const t = useTranslations("organization.basic_info_form");
  const { pending } = useFormStatus();

  const GetFormField = memo(
    ({
      name,
      type,
      options,
    }: {
      name: string;
      type: string;
      options?: { text: string }[];
    }): JSX.Element => {
      const commonProps = {
        placeholder: t(name),
        disabled: pending,
        ...register(name),
      };

      const field = {
        text: (
          <Input
            type={type}
            data-invalid={errors[name]}
            {...commonProps}
          />
        ),
        number: (
          <Input
            type={type}
            inputMode="numeric"
            data-invalid={errors[name]}
            {...commonProps}
          />
        ),
        select: (
          <Select data-invalid={errors[name]} {...commonProps}>
            {options?.map(({ text }) => (
              <option key={`${name}_${text}`} value={text}>
                {text}
              </option>
            ))}
          </Select>
        ),
        url: <Input type={type} data-invalid={errors[name]} {...commonProps} />,
        textarea: (
          <Textarea rows={9} data-invalid={errors[name]} {...commonProps} />
        ),
      }[type];

      return (
        <div style={{ width: '100%' }}>
          {field}
          <ErrorField errors={errors} fieldName={name} />
        </div>
      );
    },
  );

  return (
    <FormInnerLayout>
      <OrganizationRegisterFormBoxLayout>
        <h3>{t("main_heading")}</h3>

        <OrganizationRegisterFormGroupLayout>
          <Flex direction="column" gap="20px">
            {formFieldsConfig.main.map((field) => (
              <GetFormField key={`${field.name}_${field.type}`} {...field} />
            ))}
          </Flex>

          <ProfileImagePicker disabled={pending} errors={errors} {...register("logotype")} />
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("credentials_heading")}</h3>

        <OrganizationRegisterFormGroupLayout>
          {formFieldsConfig.credentials.map((field) => (
            <GetFormField key={`${field.name}_${field.type}`} {...field} />
          ))}
        </OrganizationRegisterFormGroupLayout>

        <span className="helper">{t("credentials_asterisk_helper")}</span>
      </OrganizationRegisterFormBoxLayout>

      <OrganizationRegisterFormBoxLayout>
        <h3>{t("extra_heading")}</h3>

        <OrganizationRegisterFormGroupLayout>
          {formFieldsConfig.extra.map((field) => (
            <GetFormField key={`${field.name}_${field.type}`} {...field} />
          ))}
        </OrganizationRegisterFormGroupLayout>
      </OrganizationRegisterFormBoxLayout>

      <Button
        type="submit"
        size="md"
        isLoading={pending}
        disabled={isSubmitting}
      >
        {t("submit")}
      </Button>
    </FormInnerLayout>
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
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      width="full"
      maxWidth="600px"
      gap="20px"
    >
      {children}
    </Flex>
  );
}
