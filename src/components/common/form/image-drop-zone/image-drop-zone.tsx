import { useTranslations } from "next-intl";
import React, { useCallback, useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
  InputFile,
  type InputFileProps,
} from "@/components/common/form/InputFile";
import { Icon } from "@/components/uikit";
import { preprocessFiles, uploadImageAction } from "@/lib/actions/file-upload";
import { safeUploadToBucket } from "@/lib/shared/utils/aws";
import { css } from "~/styled-system/css";

const preventFileOpen = (e: React.DragEvent<HTMLElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

const draggedOverDropZone = (e: React.DragEvent<HTMLSpanElement>) => {
  preventFileOpen(e);
  e.currentTarget.setAttribute("data-over", "true");
};

const dropZoneLeft = (e: React.DragEvent<HTMLSpanElement>) => {
  preventFileOpen(e);
  e.currentTarget.removeAttribute("data-over");
};

const placeholderClassName = css({
  display: "flex",
  flexDirection: "column",
  gap: "2",
  padding: "2",
  alignItems: "center",
  justifyContent: "center",
  width: "full",
  height: { base: "20vh", md: "30vh" },
  bgColor: "secondary.lighter",
  borderRadius: "sm",
  overflow: "hidden",
  color: "secondary",
  fontSize: "xs",
  textAlign: "center",
  transition: "colors",
  "&[data-filled]": { height: "full" },
  "&[data-over]": {
    bgColor: "primary.lightest",
    "& > *": { pointerEvents: "none" },
  },
});

type RenderFiles = (arg: {
  srcList: string[];
  removeAt: (idx: number) => void;
}) => React.ReactNode;

type ImageDropZoneProps = Omit<InputFileProps, "multiple"> & {
  groupKey?: string;
  maxCount?: number;
  initialSrcList?: string[];
  filesAddedCallback?: (urls: string[]) => void;
  renderFiles: RenderFiles;
};

export function ImageDropZone({
  groupKey = "public",
  maxCount = 12,
  initialSrcList = [],
  filesAddedCallback,
  renderFiles,
  onChange,
  ...props
}: ImageDropZoneProps) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("form.common");
  const [srcList, setSrcList] = useState<string[]>(initialSrcList);

  const uploadFiles = (files: File[]) => {
    if (!files || files.length === 0) return;

    startTransition(async () => {
      const actionResponse = await uploadImageAction(
        files.map(({ name, size, type }) => ({ name, size, type })),
        groupKey,
      );

      if (!actionResponse.ok) {
        actionResponse.messages.forEach((code) => {
          toast.error(t(code));
        });
        return;
      }

      const uploadedList = await safeUploadToBucket({
        urls: actionResponse.urls,
        files,
      });

      const urls = uploadedList.filter((url) => url !== null);

      if (urls.length !== uploadedList.length) {
        toast.error(t("upload_chunks_failed"));
      }

      setSrcList((prevList) => prevList.concat(urls));

      if (filesAddedCallback) {
        filesAddedCallback(urls);
      }
    });
  };

  const leftCount = maxCount - srcList.length;

  const filesChanged = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(
      preprocessFiles(target.files ? Array.from(target.files) : [], leftCount),
    );
  };

  const filesDropped = (e: React.DragEvent<HTMLSpanElement>) => {
    dropZoneLeft(e);
    uploadFiles(preprocessFiles(Array.from(e.dataTransfer.files), leftCount));
  };

  const removeAt = useCallback(
    (idx: number) => setSrcList((list) => list.filter((_, i) => i !== idx)),
    [setSrcList],
  );

  return (
    <>
      {leftCount > 0 && (
        <InputFile multiple={maxCount > 1} onChange={filesChanged} {...props}>
          <span
            className={placeholderClassName}
            onDrop={filesDropped}
            onDragEnter={draggedOverDropZone}
            onDragLeave={dropZoneLeft}
            onDragOver={preventFileOpen} // TODO should we consider debouncing or throttling `onDragOver` callback?
          >
            <Icon
              name={isPending ? "common/spinner" : "action/image-add"}
              className={css({
                fontSize: "2rem",
                _loading: { animation: "spin" },
              })}
              data-loading={isPending || undefined}
            />
            <span>
              {t(isPending ? "uploading_photo" : "drop_zone_upload_item")}
            </span>
            <span>{t("max_file_count_label", { count: leftCount })}</span>
          </span>
        </InputFile>
      )}
      {renderFiles({ srcList, removeAt })}
    </>
  );
}
