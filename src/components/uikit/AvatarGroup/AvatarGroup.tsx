import { Avatar, AvatarWrapper, type AvatarDataType } from "@/components/uikit";
import { css } from "~/styled-system/css";
import type { AvatarVariantProps } from "~/styled-system/recipes";

export function AvatarGroup({
  avatars,
  showCount = 3,
  size,
}: {
  avatars: AvatarDataType[];
  showCount?: 3 | 5;
  size?: AvatarVariantProps["size"];
}) {
  const avatarsCountLeft = avatars.length - showCount;
  const trimLastCount = avatarsCountLeft === 0 ? 0 : 1;
  const visibleAvatars = avatars.slice(0, showCount - trimLastCount).reverse();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "row-reverse",
        "& > :not(:last-child)": {
          marginInlineStart: "-1.5",
        },
      })}
    >
      {avatarsCountLeft > 0 && (
        <AvatarWrapper size={size}>+{avatarsCountLeft + 1}</AvatarWrapper>
      )}
      {visibleAvatars.map(({ image, name }) => (
        <Avatar
          key={name + "_" + image}
          image={image}
          name={name}
          size={size}
        />
      ))}
    </div>
  );
}
