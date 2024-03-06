import Image from "next/image";
import React from "react";
import { avatar, type AvatarVariantProps } from "~/styled-system/recipes";

export type AvatarDataType = {
  image: string;
  name: string;
};

type AvatarProps = AvatarVariantProps & AvatarDataType;

type AvatarWrapperProps = AvatarVariantProps & {
  children: React.ReactNode;
};

export function AvatarWrapper({ size = "sm", children }: AvatarWrapperProps) {
  return <span className={avatar({ size })}>{children}</span>;
}

export function Avatar({ image, name, size }: AvatarProps) {
  return (
    <AvatarWrapper size={size}>
      <Image src={image} alt={name} fill />
    </AvatarWrapper>
  );
}
