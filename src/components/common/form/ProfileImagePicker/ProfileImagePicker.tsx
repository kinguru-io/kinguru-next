"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { FaPenAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import {
  InputFile,
  type InputFileProps,
} from "@/components/common/form/InputFile";
import { AvatarWrapper } from "@/components/uikit";
import {
  imageSchema,
  uploadProfileImage,
  type ProfileImageActionData,
} from "@/lib/actions/file-upload";
import { css } from "~/styled-system/css";

type ProfileImagePickerProps = InputFileProps & {
  imageSrc?: string;
  name?: string;
};

export function ProfileImagePicker({
  imageSrc: propsImageSrc = "",
  name: propsName,
  ...restProps
}: ProfileImagePickerProps) {
  const [imageSrc, setImageSrc] = useState(propsImageSrc);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files) {
      return;
    }

    const image = target.files[0];
    const { name, size, type } = image;
    const uploadImageData: ProfileImageActionData = { name, size, type };
    const parseResult = imageSchema.safeParse(uploadImageData);

    if (!parseResult.success) {
      return;
    }

    startTransition(async () => {
      const presignedUrl = await uploadProfileImage(
        uploadImageData,
        "test-uploads",
      );
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: image,
      });

      if (!response.ok) {
        return;
      }

      setImageSrc(cutSearchParams(presignedUrl));
    });
  };

  return (
    <>
      <InputFile
        onChange={handleFileChange}
        accept="image/*"
        disabled={isPending}
        {...restProps}
      >
        <PickerTag />
        <AvatarWrapper size="lg">
          <AvatarPickerPlaceholder imageSrc={imageSrc} isPending={isPending} />
          {isPending && (
            <ImSpinner8
              className={css({
                position: "absolute",
                animation: "spin",
                width: "25%",
                height: "25%",
                color: "neutral.2",
              })}
            />
          )}
        </AvatarWrapper>
      </InputFile>
      <input
        type="text"
        name={propsName}
        value={imageSrc}
        required={restProps.required}
        readOnly
        hidden
      />
    </>
  );
}

function PickerTag() {
  return (
    <span
      className={css({
        zIndex: "1", // due to hiding an overflow at wrapper
        position: "absolute",
        top: "5px",
        right: "11px",
        bgColor: "primary",
        width: "27px",
        height: "27px",
        fontSize: "13px",
        padding: "7px",
        borderRadius: "full",
      })}
      aria-hidden
    >
      <FaPenAlt />
    </span>
  );
}

function AvatarPickerPlaceholder({
  imageSrc,
  isPending,
}: {
  imageSrc: string;
  isPending: boolean;
}) {
  const t = useTranslations("form.common");

  if (imageSrc) {
    return (
      <Image
        src={imageSrc}
        alt={t("uploaded_photo")}
        width={175}
        height={175}
        style={{ height: "100%", objectFit: "cover" }}
      />
    );
  }

  return (
    <span
      className={css({
        display: "grid",
        placeItems: "center",
        width: "full",
        height: "full",
        bgColor: "neutral.4",
        color: isPending ? "transparent" : "neutral.2",
        textStyle: "body.2",
      })}
    >
      {t("upload_photo")}
    </span>
  );
}

function cutSearchParams(url: string) {
  return url.slice(0, url.indexOf("?"));
}
