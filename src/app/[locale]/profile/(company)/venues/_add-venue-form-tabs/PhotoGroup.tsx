import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { ErrorField } from "@/components/uikit";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";
import { VStack } from "~/styled-system/jsx";

interface PhotoGroupProps {
  defaultValues?: { image?: string };
}

export function PhotoGroup({ defaultValues }: PhotoGroupProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  return (
    <VStack gap="30px" marginBlockEnd="20px">
      <p>{t("fields.photo_tip")}</p>
      <ProfileImagePicker
        imageSrc={defaultValues?.image}
        groupKey="venues"
        placeholderWrapper="rectangle"
        {...register("image.image")}
      />
      <ErrorField error={errors?.image?.image} />
    </VStack>
  );
}

export default PhotoGroup;
