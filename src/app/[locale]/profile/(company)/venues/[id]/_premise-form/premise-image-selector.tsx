import { useFieldArray, useFormContext } from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, ErrorField, Icon } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { css } from "~/styled-system/css";
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
      <Flex gap="2" flexWrap="wrap">
        {fields.map(({ id, url }, i) => {
          const fieldName = `${formFieldPath}.${i}.url` as const;

          return (
            <Box key={id} position="relative" css={{ flexGrow: "1" }}>
              <ProfileImagePicker
                {...register(fieldName, {
                  onChange: (e) => {
                    update(i, { url: e.target.value });
                    clearErrors(formFieldPath);
                  },
                })}
                imageSrc={url}
                groupKey="premises"
              />
              {url && (
                <Button
                  type="button"
                  className={css({
                    position: "absolute",
                    insetBlockEnd: "1",
                    insetInlineEnd: "1",
                    padding: "2",
                    fontSize: "xs",
                  })}
                  colorPalette="danger"
                  onClick={() => update(i, { url: "" })}
                  icon={<Icon name="action/cross" />}
                  rounded={false}
                />
              )}
            </Box>
          );
        })}
      </Flex>
      <ErrorField error={errors?.resources?.resources} />
    </>
  );
}
