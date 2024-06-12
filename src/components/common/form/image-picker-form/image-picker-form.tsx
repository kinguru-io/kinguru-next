import { useFormContext, useWatch } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { Button } from "@/components/uikit";
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
      position="relative"
      alignSelf="flex-start"
      css={{
        "& > .button": {
          position: "absolute",
          fontSize: "10px",
          insetBlockStart: "0.3rem",
          insetInlineEnd: "1rem",
        },
      }}
    >
      <ProfileImagePicker
        key={src}
        groupKey={groupKey}
        imageSrc={src || ""}
        {...register(name)}
      />
      {src && (
        <Button
          type="button"
          size="iconOnly"
          variant="solid"
          colorPalette="primary"
          onClick={() => setValue(name, "")}
          icon={<RxCross1 size="1.7em" />}
        />
      )}
    </Box>
  );
}
