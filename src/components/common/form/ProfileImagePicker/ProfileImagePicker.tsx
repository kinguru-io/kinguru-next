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
  uploadImageAction,
  type ImageActionData,
} from "@/lib/actions/file-upload";
import { imageSchema, videoSchema } from "@/lib/actions/file-upload/validation";
import { safeUploadToBucket } from "@/lib/shared/utils/aws";
import { videoExtensions, videoRegex } from "@/lib/shared/utils/regex";
import { css } from "~/styled-system/css";
import { aspectRatio } from "~/styled-system/patterns";
import type { ConditionalValue } from "~/styled-system/types";

type ProfileImagePickerProps = InputFileProps & {
  imageSrc?: string;
  name?: string;
  groupKey?: string;
  ratio?: ConditionalValue<number>;
  sizes?: string;
  allowVideo?: boolean;
};

/**
 * - default `ratio` is `16 / 9`
 * - default image `sizes` is `50vw`
 */
export const ProfileImagePicker = forwardRef(function ProfileImagePicker(
  {
    imageSrc: propsImageSrc = "",
    name: propsName,
    groupKey = "public",
    ratio,
    sizes,
    onChange,
    allowVideo,
    ...restProps
  }: ProfileImagePickerProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const t = useTranslations("form.common");
  const [resourceSrc, setResourceSrc] = useState(propsImageSrc);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files || !target.files[0]) {
      return;
    }

    const file = target.files[0];
    const { name, size, type } = file;
    const uploadImageData: ImageActionData = { name, size, type };

    const parseResult =
      allowVideo && videoRegex.test(file.name)
        ? videoSchema.safeParse(uploadImageData)
        : imageSchema.safeParse(uploadImageData);

    if (!parseResult.success) {
      parseResult.error.errors.forEach(({ message }) =>
        // @ts-expect-error
        toast.error(t(message)),
      );
      return;
    }

    startTransition(async () => {
      const actionResponse = await uploadImageAction(uploadImageData, groupKey);

      if (!actionResponse.ok) {
        actionResponse.messages.forEach((code) => {
          toast.error(t(code));
        });
        return;
      }

      const [url] = await safeUploadToBucket({
        urls: actionResponse.urls,
        files: [file],
      });

      if (url === null) {
        toast.error(t("upload_failed"));
        return;
      }

      setResourceSrc(url);
      onChange?.({
        target: {
          value: url,
          name: propsName,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });
  };

  return (
    <>
      <InputFile
        onChange={handleFileChange}
        accept={ACCEPTED_IMAGE_MIME_TYPES.concat(
          allowVideo ? videoExtensions : [],
        ).join(", ")}
        disabled={isPending}
      >
        <PickerPlaceholder
          resourceSrc={resourceSrc}
          isPending={isPending}
          ratio={ratio}
          sizes={sizes}
          allowVideo={allowVideo}
        />
      </InputFile>
      <input
        ref={ref}
        type="text"
        name={propsName}
        defaultValue={resourceSrc}
        required={restProps.required}
        readOnly
        hidden
        {...restProps}
      />
    </>
  );
});

function PickerPlaceholder({
  resourceSrc,
  isPending,
  ratio = 16 / 9,
  sizes = "50vw",
  allowVideo,
}: {
  resourceSrc: string;
  isPending: boolean;
  ratio?: ConditionalValue<number>;
  sizes?: string;
  allowVideo?: boolean;
}) {
  const t = useTranslations("form.common");
  const helperLabel = t(allowVideo ? "upload_item" : "upload_photo");
  const helper = isPending ? t("uploading_photo") : helperLabel;

  return (
    <span
      className={css({
        display: "inline-block",
        minWidth: "20",
        width: "full",
        bgColor: "secondary.lighter",
        borderRadius: "sm",
        bgPosition: "center",
        bgSize: "cover",
        bgRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
      })}
      style={{ backgroundImage: `url(${resourceSrc})` }}
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
        data-loaded={Boolean(resourceSrc)}
      >
        {!resourceSrc && (
          <>
            <Icon
              name={isPending ? "common/spinner" : "action/image-add"}
              className={css({
                fontSize: "2rem",
                _loading: { animation: "spin" },
              })}
              aria-busy={isPending}
            />
            {helper}
          </>
        )}
      </span>
      <span className={aspectRatio({ display: "block", ratio })}>
        {resourceSrc &&
          !isPending &&
          (videoRegex.test(resourceSrc) ? (
            <Icon
              name="common/play-icon"
              className={css({
                color: "secondary",
                height: { base: "16!", md: "24!" },
                marginBlock: "auto",
              })}
            />
          ) : (
            <Image src={resourceSrc} alt="" sizes={sizes} fill />
          ))}
      </span>
    </span>
  );
}
