"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { FaPenAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import {
  InputFile,
  type InputFileProps,
} from "@/components/common/form/input-file";
import { AvatarWrapper } from "@/components/uikit";
import { uploadProfileImage } from "@/lib/actions/file-upload";
import { css } from "~/styled-system/css";

type ProfileImagePickerProps = {
  imgPlaceholderSrc?: string;
} & InputFileProps;

export function ProfileImagePicker({
  imgPlaceholderSrc = "",
  ...restProps
}: ProfileImagePickerProps) {
  const [imageSrc, setImageSrc] = useState(imgPlaceholderSrc);
  const [isPending, startTransition] = useTransition();

  // TODO add validation
  const handleFileChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const formData = new FormData();
      formData.append(target.name, target.files[0]);

      startTransition(async () => {
        const url = await uploadProfileImage(formData, target.name);

        if (url) {
          setImageSrc(url);
        }
      });
    }
  };

  // TODO add invinsible text input with value={imageSrc}
  return (
    <InputFile
      onChange={handleFileChange}
      accept="image/*"
      name="profile-image"
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
  );
}

function PickerTag() {
  return (
    <span
      className={css({
        zIndex: "1",
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
  if (imageSrc) {
    return <Image src={imageSrc} alt="" fill />;
  }

  // TODO Add translations
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
      Загрузите фото
    </span>
  );
}
