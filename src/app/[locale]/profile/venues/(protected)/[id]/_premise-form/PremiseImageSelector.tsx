import { useFieldArray, useFormContext } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, ErrorField } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { Box, Flex } from "~/styled-system/jsx";

export function PremiseImageSelector() {
  const {
    control,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  const formFieldPath = "resources.resources";
  const { fields, update } = useFieldArray({
    control,
    name: formFieldPath,
  });

  return (
    <>
      <Flex
        gap="1.25rem"
        flexWrap="wrap"
        justifyContent="space-around"
        paddingInline="25px"
      >
        {fields.map(({ id, url }, i) => {
          const fieldName = `${formFieldPath}.${i}.url` as const;

          return (
            <Box
              key={id}
              position="relative"
              css={{
                "& > .button": {
                  position: "absolute",
                  insetBlockStart: "-1em",
                  insetInlineEnd: "-1em",
                  fontSize: "8px",
                },
              }}
            >
              <ProfileImagePicker
                {...register(fieldName, {
                  onChange: (e) => {
                    update(i, { url: e.target.value });
                    clearErrors(formFieldPath);
                  },
                })}
                imageSrc={url}
                placeholderWrapper="rectangle-smaller"
                groupKey="premises"
              />
              {url && (
                <Button
                  size="iconOnly"
                  variant="solid"
                  colorPalette="primary"
                  onClick={() => update(i, { url: "" })}
                  icon={<RxCross1 />}
                />
              )}
            </Box>
          );
        })}
      </Flex>
      <Flex paddingInline="25px">
        <ErrorField error={errors?.resources?.resources?.root} />
      </Flex>
    </>
  );
}
