import { useFormContext, useWatch } from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button, Icon } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";

export function ImagePickerForm({
  name,
  groupKey,
}: {
  name: string;
  groupKey: string;
}) {
  const {
    control,
    register,
    setValue,
    formState: { defaultValues },
  } = useFormContext();
  const src = useWatch({
    control,
    name,
    defaultValue: defaultValues && defaultValues[name],
  });

  return (
    <Box
      css={{
        position: "relative",
        flexBasis: "full",
        height: "fit-content",
        md: { flexBasis: "32", maxWidth: "32" },
        "& img": { objectFit: "contain" },
      }}
    >
      <ProfileImagePicker
        key={src}
        groupKey={groupKey}
        imageSrc={src || ""}
        ratio={{ base: 21 / 9, md: 1 }}
        {...register(name)}
      />
      {src && (
        <Button
          className={css({
            position: "absolute",
            padding: "3",
            insetBlockEnd: "2.5",
            insetInlineEnd: "2.5",
            md: {
              padding: "0.5",
              insetBlockEnd: "2",
              insetInlineEnd: "2",
            },
          })}
          type="button"
          colorPalette="danger"
          onClick={() => setValue(name, "")}
          icon={
            <Icon
              name="action/trash-can"
              className={css({ fontSize: { base: "md", md: "xl" } })}
            />
          }
          rounded={false}
        />
      )}
    </Box>
  );
}
