import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
  HStack,
  Radio,
  RadioGroup,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useLocale } from "@/utils/use-locale.ts";

export const PlaceTypeSchema = z.object({
  typeOfEventSpace: z.string(),
  parkingArea: z.object({}),
  cameraOrAudioRecording: z.boolean().nullish(),
});

export function NewPlaceType({
  type,
  setType,
  activeStep,
  setActiveStep,
}: {
  type?: z.infer<typeof PlaceTypeSchema>;
  setType?: Dispatch<
    SetStateAction<z.infer<typeof PlaceTypeSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useLocale();
  return (
    <Formik
      initialValues={
        type || {
          typeOfEventSpace: "",
          parkingArea: {},
          cameraOrAudioRecording: null,
        }
      }
      validationSchema={toFormikValidationSchema(PlaceTypeSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setType && setType(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={"full"} px={5}>
              <Field name="typeOfEventSpace">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.typeOfEventSpace?.length &&
                      form.touched.typeOfEventSpace !== undefined
                    }
                  >
                    <FormLabel>{t("places.type_of_event_space")}</FormLabel>
                    <Input variant={"brand"} {...field} />
                    <FormHelperText>Helo</FormHelperText>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="parkingArea">
                {({ form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.parkingArea?.length &&
                      form.touched.parkingArea !== undefined
                    }
                  >
                    <FormLabel>{t("places.parking_area")}</FormLabel>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="cameraOrAudioRecording">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors.cameraOrAudioRecording?.length &&
                      form.touched.cameraOrAudioRecording !== undefined
                    }
                  >
                    <FormLabel>
                      {t("places.camera_or_audio_recoding")}
                    </FormLabel>
                    <RadioGroup
                      onChange={(value) =>
                        field.onChange({
                          target: {
                            name: "cameraOrAudioRecording",
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
                {t("events.new_event_prev")}
              </Button>
            ) : null}
            <Button
              variant={"secondary"}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {t("events.new_event_next")}
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  );
}
