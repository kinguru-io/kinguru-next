import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useLocale } from "@/utils/use-locale";

export const InviteForm = () => {
  const { t } = useLocale();
  const inviteSchema = z.object({
    telephone: z.string().optional(),
    email: z.string().email(t("invite.invalid_email")),
  });

  return (
    <Formik
      initialValues={{ telephone: "", email: "" }}
      validationSchema={toFormikValidationSchema(inviteSchema)}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(props) => (
        <Form>
          <Field name="telephone">
            {({ field, form, meta }: FieldProps) => (
              <FormControl
                py={1}
                isInvalid={
                  !!form.errors.telephone?.length &&
                  form.touched.telephone !== undefined
                }
              >
                <FormLabel color={useColorModeValue("gray.100", "gray.700")}>
                  {t("invite.telephone")}
                </FormLabel>
                <Input variant={"invitation"} {...field} placeholder="+" />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form, meta }: FieldProps) => (
              <FormControl
                py={1}
                isInvalid={
                  !!form.errors.email?.length &&
                  form.touched.email !== undefined
                }
              >
                <FormLabel color={useColorModeValue("gray.100", "gray.700")}>
                  {t("invite.email")}
                </FormLabel>
                <Input variant={"invitation"} {...field} />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={6}
            variant={"primary"}
            isLoading={props.isSubmitting}
            type="submit"
          >
            {t("invite.subscribe")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
