import { useFieldArray, useFormContext } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button } from "@/components/uikit";
import { type CreatePremiseSchema } from "@/lib/actions/premise";
import { Box, Flex } from "~/styled-system/jsx";

export function PremiseImageSelector() {
  const { control, register } = useFormContext<CreatePremiseSchema>();
  const { fields, update } = useFieldArray({
    control,
    name: "resources",
  });

  return (
    <Flex
      gap="1.25rem"
      flexWrap="wrap"
      justifyContent="space-around"
      paddingInline="25px"
    >
      {fields.map(({ id, url }, i) => {
        const fieldName = `resources.${i}.url` as const;

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
                onChange: (e) => update(i, { url: e.target.value }),
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
  );
}
