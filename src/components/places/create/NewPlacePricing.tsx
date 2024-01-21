import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  HStack,
  FormHelperText,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const PlacePricingSchema = z.object({
  rentalPriceByHour: z.number(),
  cleaningFee: z.boolean(),
  cleaningFeePrice: z.number().min(100).optional(),
});

export function NewPlacePricing({
  pricing,
  setPricing,
  activeStep,
  setActiveStep,
}: {
  pricing?: z.infer<typeof PlacePricingSchema>;
  setPricing?: Dispatch<
    SetStateAction<z.infer<typeof PlacePricingSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const t = useTranslations();
  return (
    <Formik
      initialValues={
        pricing || {
          rentalPriceByHour: 0,
          cleaningFee: false,
          cleaningFeePrice: undefined,
        }
      }
      validationSchema={toFormikValidationSchema(PlacePricingSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setPricing && setPricing(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} mx={"auto"} px={5} spacing={7}>
              <Field name="rentalPriceByHour">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.rentalPriceByHour?.length &&
                      form.touched.rentalPriceByHour !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.pricing_rental_price_by_hour")}
                    </FormLabel>
                    <NumberInput
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "rentalPriceByHour",
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
                      {t("places.pricing_rental_price_by_hour_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cleaningFee">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.cleaningFee?.length &&
                      form.touched.cleaningFee !== undefined
                    }
                  >
                    <FormLabel>{t("places.pricing_cleaning_fee")}</FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "cleaningFee",
                            value: value === "1",
                          },
                        })
                      }
                      defaultValue={field.value ? "1" : "0"}
                    >
                      <VStack alignItems={"flex-start"}>
                        <Radio value={"1"}>{t("places.yes")}</Radio>
                        <Radio value={"0"}>{t("places.no")}</Radio>
                      </VStack>
                    </RadioGroup>
                    <FormHelperText whiteSpace={"pre-line"}>
                      {t("places.pricing_cleaning_fee_helper")}
                    </FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cleaningFeePrice">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.cleaningFeePrice?.length &&
                      form.touched.cleaningFeePrice !== undefined
                    }
                    isDisabled={!form.values.cleaningFee}
                  >
                    <FormLabel>
                      {t("places.pricing_cleaning_fee_price")}
                    </FormLabel>
                    <NumberInput
                      min={10}
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "cleaningFeePrice",
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
