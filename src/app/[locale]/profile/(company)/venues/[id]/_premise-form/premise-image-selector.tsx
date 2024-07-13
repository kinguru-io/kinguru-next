import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { useCallback, type PropsWithChildren } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ImageDropZone } from "@/components/common/form/image-drop-zone";
import { ProfileImagePicker } from "@/components/common/form/ProfileImagePicker";
import { ArrowIcon, Button, ErrorField, Icon } from "@/components/uikit";
import { CreatePremiseFormSchemaProps } from "@/lib/actions/premise/validation";
import { css, cx } from "~/styled-system/css";
import { Box, Grid } from "~/styled-system/jsx";
import { aspectRatio } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

// pregenerate ratio
aspectRatio.raw({ ratio: { base: 1, md: 16 / 9 } });

export function PremiseImageSelector() {
  const {
    control,
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreatePremiseFormSchemaProps>();

  const formFieldPath = "resources.resources";
  const { fields, update, swap, append, remove } = useFieldArray({
    control,
    name: formFieldPath,
  });

  const imagePositionChanged = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && "id" in over) {
        swap(+active.id, +over.id);
      }
    },
    [swap],
  );

  const filesAddedCallback = useCallback(
    (urls: string[]) => append(urls.map((url) => ({ url }))),
    [append],
  );

  return (
    <ImageDropZone
      groupKey="premises"
      initialSrcList={fields.map(({ url }) => url)}
      filesAddedCallback={filesAddedCallback}
      renderFiles={({ removeAt }) => {
        return (
          <DndContext onDragEnd={imagePositionChanged}>
            <SortableContext
              items={Array.from({ length: fields.length }, (_, idx) => idx)}
              strategy={rectSwappingStrategy}
            >
              <Grid
                css={{
                  gap: "2",
                  gridTemplateColumns: {
                    base: "3",
                    sm: "4",
                    md: "repeat(auto-fit, minmax({spacing.52}, 1fr))",
                  },
                }}
              >
                {fields.map(({ id, url }, i) => {
                  const fieldName = `${formFieldPath}.${i}.url` as const;

                  return (
                    <Sortable key={id} id={i}>
                      <ProfileImagePicker
                        {...register(fieldName, {
                          onChange: (e) => {
                            update(i, { url: e.target.value });
                            clearErrors(formFieldPath);
                          },
                        })}
                        imageSrc={url}
                        ratio={{ base: 1, md: 16 / 9 }} // pregenerated at the top of the module
                        groupKey="premises"
                      />
                      {url && (
                        <Button
                          type="button"
                          className={css({
                            position: "absolute",
                            insetBlockEnd: "1",
                            insetInlineEnd: "1",
                            padding: "0.5",
                            "& svg": { fontSize: "xl" },
                          })}
                          colorPalette="danger"
                          onClick={() => {
                            remove(i);
                            removeAt(i);
                          }}
                          icon={<Icon name="action/trash-can" />}
                          rounded={false}
                        />
                      )}
                    </Sortable>
                  );
                })}
              </Grid>
              <ErrorField error={errors?.resources?.resources} />
            </SortableContext>
          </DndContext>
        );
      }}
    />
  );
}

function Sortable({ id, children }: PropsWithChildren<{ id: number }>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useSortable({ id, transition: null });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <Box
      ref={setNodeRef}
      css={{
        position: "relative",
        borderRadius: "sm",
        _first: { boxShadow: "ring-primary" },
        "&[data-dragging]": { zIndex: "1", opacity: "0.7" },
        md: { maxWidth: "md" },
      }}
      style={style}
      {...attributes}
      data-dragging={isDragging || undefined}
    >
      {children}
      {id !== 0 && (
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...listeners}
          className={cx(
            css({
              touchAction: "none",
              cursor: "grab",
              position: "absolute",
              insetInlineEnd: "0",
              insetBlockStart: "0",
              padding: "1",
              "&[data-dragging]": { cursor: "grabbing" },
              "& > svg": {
                fontSize: "2xl",
                padding: "2",
                bgColor: "primary.lighter",
                borderRadius: "sm",
              },
            }),
          )}
          data-dragging={isDragging || undefined}
        >
          <Icon name="action/move" />
        </button>
      )}
    </Box>
  );
}
