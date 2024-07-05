import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { ImagePickerForm } from "@/components/common/form/image-picker-form";
// import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { ErrorField } from "@/components/uikit";
import { maxFileSizeMB } from "@/lib/actions/file-upload";
import { CreateVenueFormSchemaProps } from "@/lib/actions/venue";

// TODO ! resolve comments when the service is ready

interface PhotoGroupProps {
  defaultValues?: { image?: string };
}

export function PhotoGroup(_unused: PhotoGroupProps) {
  const {
    formState: { errors },
  } = useFormContext<CreateVenueFormSchemaProps>();
  const t = useTranslations("profile.venues.add");

  return (
    <>
      <span className="helper">{t("fields.photo_tip")}</span>
      <ImagePickerForm groupKey="venues" name="image.image" />
      {/* <ProfileImagePicker
        imageSrc={defaultValues?.image}
        groupKey="venues"
        {...register("image.image")}
      /> */}
      <ErrorField error={errors?.image?.image} />
      <span className="notice">
        {t("fields.photo_tip_extra", { size: maxFileSizeMB })}
      </span>
    </>
  );
}

export default PhotoGroup;
