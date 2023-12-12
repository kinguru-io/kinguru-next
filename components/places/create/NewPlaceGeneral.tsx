import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  HStack,
  Input,
  FormHelperText,
  Textarea,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
} from "@chakra-ui/react";
import { CreatableSelect, Select } from "chakra-react-select";
import { Field, FieldProps, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useLocale } from "@/utils/use-locale.ts";

export const PlaceGeneralSchema = z.object({
  typeOfPremises: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1),
  title: z.string().min(10),
  description: z.string().min(280),
  rules: z.string().min(100).optional(),
  area: z.number().min(10),
  minCapacity: z.number().min(0),
  maxCapacity: z.number().min(0),
  ageRestrictions: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export function NewPlaceGeneral({
  general,
  setGeneral,
  activeStep,
  setActiveStep,
}: {
  general?: z.infer<typeof PlaceGeneralSchema>;
  setGeneral?: Dispatch<
    SetStateAction<z.infer<typeof PlaceGeneralSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useLocale();

  const typeOfPremisesOptions = [
    { value: "photostudio", label: t("places.types_of_premises.photostudio") },
  ];
  const ageRestrictionsOptions = [
    { value: "+4", label: "+4" },
    { value: "+5", label: "+5" },
    { value: "+6", label: "+6" },
    { value: "+7", label: "+7" },
    { value: "+8", label: "+8" },
    { value: "+9", label: "+9" },
    { value: "+10", label: "+10" },
    { value: "+11", label: "+11" },
    { value: "+12", label: "+12" },
    { value: "+13", label: "+13" },
    { value: "+14", label: "+14" },
    { value: "+15", label: "+15" },
    { value: "+16", label: "+16" },
    { value: "+17", label: "+17" },
    { value: "+18", label: "+18" },
    { value: "+19", label: "+19" },
    { value: "+20", label: "+20" },
    { value: "+21", label: "+21" },
    {
      value: "all",
      label: t("places.no_age_restrictions"),
    },
  ];

  return (
    <Formik
      initialValues={
        general || {
          typeOfPremises: [],
          title: "",
          description: "",
          rules: "",
          area: 20,
          minCapacity: 1,
          maxCapacity: 10,
          ageRestrictions: {
            value: "+4",
            label: "+4",
          },
        }
      }
      validationSchema={toFormikValidationSchema(PlaceGeneralSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setGeneral && setGeneral(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} mx={"auto"} px={5} spacing={7}>
              <Field name="typeOfPremises">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.typeOfPremises?.length &&
                      form.touched.typeOfPremises !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.general_type_of_premises")}
                    </FormLabel>
                    <CreatableSelect
                      isMulti
                      variant={"brand"}
                      options={typeOfPremisesOptions}
                      value={field.value}
                      onChange={(values) =>
                        field.onChange({
                          target: {
                            name: "typeOfPremises",
                            value: values,
                          },
                        })
                      }
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_type_of_premises_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="title">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.title?.length &&
                      form.touched.title !== undefined
                    }
                  >
                    <FormLabel>{t("places.general_title")}</FormLabel>
                    <Input
                      variant={"brand"}
                      placeholder={t("places.general_title_placeholder")}
                      {...field}
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_title_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.description?.length &&
                      form.touched.description !== undefined
                    }
                  >
                    <FormLabel>{t("places.general_description")}</FormLabel>
                    <Textarea
                      variant={"brand"}
                      placeholder={t("places.general_description_placeholder")}
                      {...field}
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_description_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="rules">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.rules?.length &&
                      form.touched.rules !== undefined
                    }
                  >
                    <FormLabel>{t("places.general_rules")}</FormLabel>
                    <Textarea
                      variant={"brand"}
                      placeholder={t("places.general_rules_placeholder")}
                      {...field}
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_rules_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="area">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.area?.length &&
                      form.touched.area !== undefined
                    }
                  >
                    <FormLabel>{t("places.general_area")}</FormLabel>
                    <NumberInput
                      min={10}
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "area",
                            value: parseInt(value),
                          },
                        })
                      }
                      value={field.value}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_area_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="minCapacity">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.minCapacity?.length &&
                      form.touched.minCapacity !== undefined
                    }
                  >
                    <FormLabel>{t("places.general_min_capacity")}</FormLabel>
                    <NumberInput
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "minCapacity",
                            value: parseInt(value),
                          },
                        })
                      }
                      value={field.value}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_min_capacity_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="maxCapacity">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.maxCapacity?.length &&
                      form.touched.maxCapacity !== undefined
                    }
                  >
                    <FormLabel>{t("places.general_max_capacity")}</FormLabel>
                    <NumberInput
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "maxCapacity",
                            value: parseInt(value),
                          },
                        })
                      }
                      value={field.value}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_max_capacity_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="ageRestrictions">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.ageRestrictions?.length &&
                      form.touched.ageRestrictions !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.general_age_restrictions")}
                    </FormLabel>
                    <Select
                      variant={"brand"}
                      options={ageRestrictionsOptions}
                      value={field.value}
                      onChange={(values) =>
                        field.onChange({
                          target: {
                            name: "ageRestrictions",
                            value: values,
                          },
                        })
                      }
                    />
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.general_age_restrictions_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
          </Flex>
          <HStack w={"full"} justifyContent={"center"}>
            {activeStep !== 0 ? (
              <Button
                variant={"secondary"}
                onClick={() =>
                  setActiveStep && setActiveStep((activeStep || 0) - 1)
                }
              >
                {t("places.new_place_prev")}
              </Button>
            ) : null}
            <Button
              variant={"secondary"}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {t("places.new_place_next")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
