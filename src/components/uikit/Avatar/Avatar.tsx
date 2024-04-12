import Image from "next/image";
import type { User } from "next-auth";
import defaultAvatar from "~/public/img/defaultImages/defaultUserAvatar.svg";
import { avatar, type AvatarVariantProps } from "~/styled-system/recipes";

export type AvatarDataType = Pick<User, "name" | "image">;

type AvatarProps = AvatarVariantProps & AvatarDataType;

type AvatarWrapperProps = AvatarVariantProps & {
  children: React.ReactNode;
};

export function AvatarWrapper({ size, children }: AvatarWrapperProps) {
  return <span className={avatar({ size })}>{children}</span>;
}

export function Avatar({ image, name, size }: AvatarProps) {
  return (
    <AvatarWrapper size={size}>
      <Image src={image || defaultAvatar.src} alt={name || "Username"} fill />
    </AvatarWrapper>
  );
}
