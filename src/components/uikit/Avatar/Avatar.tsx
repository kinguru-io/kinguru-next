import type { User } from "next-auth";
import { AvatarImage } from "./avatar-image";
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
      {image && <AvatarImage src={"/123" + image} />}
    </AvatarWrapper>
  );
}

const firstLetterRegex = /(?<=\s+|^)[\w\d]/gm;

function prepareAbbreviation(name: string) {
  const matches = name.match(firstLetterRegex);

  if (!matches) return name[0];

  return matches[0] + matches[1] || "";
}
