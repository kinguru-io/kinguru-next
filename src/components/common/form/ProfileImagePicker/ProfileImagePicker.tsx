"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ForwardedRef, forwardRef, useState, useTransition } from "react";
import { FaPenAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";
import {
  InputFile,
  type InputFileProps,
} from "@/components/common/form/InputFile";
import {
  imageSchema,
  uploadProfileImage,
  type ProfileImageActionData,
} from "@/lib/actions/file-upload";
import { css } from "~/styled-system/css";
import { avatar } from "~/styled-system/recipes";

type PlaceholderVariant = "circle" | "rectangle" | "rectangle-smaller";

type ProfileImagePickerProps = InputFileProps & {
  imageSrc?: string;
  name?: string;
  groupKey?: string;
  placeholderWrapper?: PlaceholderVariant;
};

export const ProfileImagePicker = forwardRef(function ProfileImagePicker(
  {
    imageSrc: propsImageSrc = "",
    name: propsName,
    groupKey = "undefined_key",
    placeholderWrapper = "circle",
    onChange,
    ...restProps
  }: ProfileImagePickerProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
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
    const parseResult = imageSchema.safeParse(uploadImageData);

    if (!parseResult.success) {
      return;
    }

    startTransition(async () => {
      const presignedUrl = await uploadProfileImage(uploadImageData, groupKey);
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: image,
      });

      if (!response.ok) {
        return;
      }

      onChange?.({
        target: {
          value: cutSearchParams(presignedUrl),
          name: propsName,
        },
      } as React.ChangeEvent<HTMLInputElement>);
      setImageSrc(cutSearchParams(presignedUrl));
    });
  };

  return (
    <>
      <InputFile
        onChange={handleFileChange}
        accept="image/*"
        disabled={isPending}
      >
        {placeholderWrapper === "circle" && <PickerTag />}
        <PickerPlaceholder
          imageSrc={imageSrc}
          isPending={isPending}
          placeholderVariant={placeholderWrapper}
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

const placeholderVariantMap: Record<
  PlaceholderVariant,
  {
    wrapperClassName: string;
    imageParams: { width: number; height: number };
    noImageContent?: React.ReactNode;
  }
> = {
  circle: {
    wrapperClassName: avatar({ size: "lg" }),
    imageParams: { width: 175, height: 175 },
  },
  rectangle: {
    wrapperClassName: css({
      display: "grid",
      placeItems: "center",
      layerStyle: "dashedWrapper",
      overflow: "hidden",
      position: "relative",
      width: "400px",
      height: "225px",
    }),
    imageParams: { width: 400, height: 225 },
    noImageContent: (
      <RxCross1
        className={css({
          color: "primary",
          rotate: "45deg",
          fontSize: "5.625em",
        })}
      />
    ),
  },
  "rectangle-smaller": {
    wrapperClassName: css({
      display: "grid",
      placeItems: "center",
      layerStyle: "dashedWrapper",
      overflow: "hidden",
      position: "relative",
      width: "240px",
      height: "135px",
    }),
    imageParams: { width: 240, height: 135 },
    noImageContent: (
      <RxCross1
        className={css({
          color: "primary",
          rotate: "45deg",
          fontSize: "4.25em",
        })}
      />
    ),
  },
};

function PickerPlaceholder({
  imageSrc,
  isPending,
  placeholderVariant,
}: {
  imageSrc: string;
  isPending: boolean;
  placeholderVariant: PlaceholderVariant;
}) {
  const t = useTranslations("form.common");

  const {
    wrapperClassName,
    imageParams,
    noImageContent = t("upload_photo"),
  } = placeholderVariantMap[placeholderVariant];

  return (
    <span className={wrapperClassName}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={t("uploaded_photo")}
          style={{ height: "100%", objectFit: "cover" }}
          {...imageParams}
        />
      ) : (
        <span
          className={css({
            display: "grid",
            placeItems: "center",
            width: "full",
            height: "full",
            // TODO Needs refactor
            bgColor: ["rectangle", "rectangle-smaller"].includes(
              placeholderVariant,
            )
              ? "neutral.5"
              : "neutral.4",
            color: isPending ? "transparent" : "neutral.2",
            textStyle: "body.2",
          })}
        >
          {!isPending && noImageContent}
        </span>
      )}
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
    </span>
  );
}

function cutSearchParams(url: string) {
  return url.slice(0, url.indexOf("?"));
}
