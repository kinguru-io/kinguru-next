import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  HStack,
  Image,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { usePresignedUpload } from "next-s3-upload";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { getImageDimensions } from "@/utils/image-utils.ts";
import { useLocale } from "@/utils/use-locale.ts";

export const PlaceResourcesSchema = z.object({
  resources: z.array(
    z.object({
      width: z.number(),
      height: z.number(),
      url: z.string(),
    }),
  ),
});

export function NewPlaceResources({
  resources,
  setResources,
  activeStep,
  setActiveStep,
}: {
  resources?: z.infer<typeof PlaceResourcesSchema>;
  setResources?: Dispatch<
    SetStateAction<z.infer<typeof PlaceResourcesSchema> | undefined>
  >;
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useLocale();
  const { FileInput, openFileDialog, uploadToS3 } = usePresignedUpload();

  return (
    <Formik
      initialValues={resources || { resources: [] }}
      validationSchema={toFormikValidationSchema(PlaceResourcesSchema)}
      onSubmit={(values, actions) => {
        setActiveStep && setActiveStep((activeStep || 0) + 1);
        setResources && setResources(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Flex w={"full"} py={10} flexDirection={["column", "column", "row"]}>
            <VStack w={["full", "full", "50%"]} mx={"auto"} px={5} spacing={7}>
              <Field name="resources">
                {({ field, form, meta }: FieldProps) => (
                  <FormControl
                    display={"flex"}
                    w={"full"}
                    h={"full"}
                    bgColor={"gray.50"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    p={5}
                    isInvalid={
                      !!form.errors.resources?.length &&
                      form.touched.resources !== undefined
                    }
                  >
                    <FileInput
                      onChange={async (file: File) => {
                        const { url } = await uploadToS3(file);
                        const dimensions = await getImageDimensions(file);
                        console.log(url, dimensions);
                        field.onChange({
                          target: {
                            name: "resources",
                            value: [
                              ...field.value,
                              {
                                ...dimensions,
                                url,
                              },
                            ],
                          },
                        });
                      }}
                    />
                    {field.value.length > 0 &&
                      field.value.map(({ url }: { url: string }) => (
                        <Flex position={"relative"}>
                          <Image
                            key={url}
                            maxWidth={"320px"}
                            backgroundColor={"white"}
                            src={url}
                            p={5}
                            border={"1px solid"}
                            borderColor={"gray.100"}
                            mb={5}
                          />
                          <AbsoluteCenter left={0}>
                            <Button
                              variant={"primary"}
                              onClick={() =>
                                form.setFieldValue(
                                  "resources",
                                  field.value.filter(
                                    (value: { url: string }) =>
                                      value.url !== url,
                                  ),
                                )
                              }
                            >
                              Remove
                            </Button>
                          </AbsoluteCenter>
                        </Flex>
                      ))}
                    <Button variant={"secondary"} onClick={openFileDialog}>
                      {t("places.resources_upload_button")}
                    </Button>
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
