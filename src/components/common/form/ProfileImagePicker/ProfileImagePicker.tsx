"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ForwardedRef, forwardRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  InputFile,
  type InputFileProps,
} from "@/components/common/form/InputFile";
import { Icon } from "@/components/uikit";
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  uploadProfileImage,
  type ProfileImageActionData,
} from "@/lib/actions/file-upload";
import { css } from "~/styled-system/css";
import { aspectRatio } from "~/styled-system/patterns";
import type { ConditionalValue } from "~/styled-system/types";

type ProfileImagePickerProps = InputFileProps & {
  imageSrc?: string;
  name?: string;
  groupKey?: string;
  ratio?: ConditionalValue<number>;
  sizes?: string;
};

/**
 * - default `ratio` is `16 / 9`
 * - default image `sizes` is `50vw`
 */
export const ProfileImagePicker = forwardRef(function ProfileImagePicker(
  {
    imageSrc: propsImageSrc = "",
    name: propsName,
    groupKey = "undefined_key",
    ratio,
    sizes,
    onChange,
    ...restProps
  }: ProfileImagePickerProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const t = useTranslations("form.common");
  const [imageSrc, setImageSrc] = useState(propsImageSrc);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || !target.files[0]) {
      return;
    }

    const image = target.files[0];
    const { name, size, type } = image;
    const uploadImageData: ProfileImageActionData = { name, size, type };

    startTransition(async () => {
      const actionResponse = await uploadProfileImage(
        uploadImageData,
        groupKey,
      );

      if (Array.isArray(actionResponse)) {
        actionResponse.forEach((code) => {
          toast.error(t(code));
        });
        return;
      }

      try {
        const response = await fetch(actionResponse, {
          method: "PUT",
          body: image,
        });

        if (!response.ok) {
          toast.error(t("upload_failed"));
          return;
        }
      } catch (_) {
        toast.error(t("upload_failed"));
        return;
      }

      onChange?.({
        target: {
          value: cutSearchParams(actionResponse),
          name: propsName,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      setImageSrc(cutSearchParams(actionResponse));
    });
  };

  return (
    <>
      <InputFile
        onChange={handleFileChange}
        accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
        disabled={isPending}
      >
        <PickerPlaceholder
          imageSrc={imageSrc}
          isPending={isPending}
          ratio={ratio}
          sizes={sizes}
        />
      </InputFile>
      <input
        ref={ref}
        type="text"
        name={propsName}
        defaultValue={imageSrc}
        required={restProps.required}
        readOnly
        hidden
        {...restProps}
      />
    </>
  );
});

function PickerPlaceholder({
  imageSrc,
  isPending,
  ratio = 16 / 9,
  sizes = "50vw",
}: {
  imageSrc: string;
  isPending: boolean;
  ratio?: ConditionalValue<number>;
  sizes?: string;
}) {
  const t = useTranslations("form.common");

  return (
    <span
      className={css({
        display: "inline-block",
        minWidth: "32",
        width: "full",
        bgColor: "secondary.lighter",
        borderRadius: "sm",
        bgPosition: "center",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      })}
      style={{
        backgroundImage: `url(${imageSrc})`,
      }}
    >
      <span
        className={css({
          position: "absolute",
          inset: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2",
          placeItems: "center",
          color: "secondary",
          fontSize: "xs",
          textAlign: "center",
          "&[data-loaded=true]": { backdropFilter: "blur(10px)" },
        })}
        data-loaded={Boolean(imageSrc)}
      >
        <Icon
          name={isPending ? "common/spinner" : "action/image-add"}
          className={css({ fontSize: "2rem", _loading: { animation: "spin" } })}
          aria-busy={isPending}
        />
        {t(isPending ? "uploading_photo" : "upload_photo")}
      </span>
      <span className={aspectRatio({ display: "block", ratio })}>
        {imageSrc && !isPending && (
          <Image src={imageSrc} alt="" sizes={sizes} fill />
        )}
      </span>
    </span>
  );
}

function cutSearchParams(url: string) {
  return url.slice(0, url.indexOf("?"));
}
