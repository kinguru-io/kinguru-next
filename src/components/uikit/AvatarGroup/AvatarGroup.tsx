import { Avatar, AvatarWrapper, type AvatarDataType } from "../Avatar";
import { css } from "~/styled-system/css";

type AvatarProps = {
  avatars: AvatarDataType[];
  showCount?: 3 | 5;
};

export function AvatarGroup({ avatars, showCount = 3 }: AvatarProps) {
  const avatarsCountLeft = avatars.length - showCount;
  const trimLastCount = avatarsCountLeft === 0 ? 0 : 1;
  const visibleAvatars = avatars.slice(0, showCount - trimLastCount).reverse();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "row-reverse",
        "& .avatar:not(:last-child)": {
          marginInlineStart: "-5px",
        },
      })}
    >
      {avatarsCountLeft > 0 && (
        <AvatarWrapper>+{avatarsCountLeft + 1}</AvatarWrapper>
      )}
      {visibleAvatars.map(({ image, name }) => (
        <Avatar key={name} image={image} name={name} />
      ))}
    </div>
  );
}
