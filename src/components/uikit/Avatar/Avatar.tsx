import type { User } from "next-auth";
import { AvatarImage } from "./avatar-image";
import { prepareAbbreviation } from "./prepare-abbr";
import { css } from "~/styled-system/css";
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
      <span className={css({ textTransform: "uppercase" })}>
        {name ? prepareAbbreviation(name) : "?"}
      </span>
      {image && <AvatarImage src={image} />}
    </AvatarWrapper>
  );
}
