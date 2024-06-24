import Image from "next/image";
import type { User } from "next-auth";
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
      {image && (
        <Image
          src={image}
          onError={addFailedAttribute}
          alt=""
          sizes="40px"
          fill
        />
      )}
    </AvatarWrapper>
  );
}

const firstLetterRegex = /(?<=\s+|^)[\w\d]/gm;

function prepareAbbreviation(name: string) {
  const matches = name.match(firstLetterRegex);

  if (!matches) return name[0];

  return matches[0] + matches[1] || "";
}

function addFailedAttribute({
  currentTarget,
}: React.SyntheticEvent<HTMLImageElement>) {
  // due to black/gray border on broken image
  currentTarget.setAttribute("data-failed", "true");
}
