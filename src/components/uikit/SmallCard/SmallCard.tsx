import { Avatar } from "../Avatar";
import { Tag } from "../Tag";
import { css } from "~/styled-system/css";
import { Flex, Float } from "~/styled-system/jsx";
import { SmallCardVariantProps, smallCard } from "~/styled-system/recipes";

type SmallCardProps = {
  children: React.ReactNode;
  rating?: number;
} & SmallCardVariantProps;

type SmallCardAvatarProps = {
  src: string;
  name: string;
};

type SmallCardContentProps = {
  title: string;
  description: string;
};

export function SmallCard({
  children,
  variant = "speaker",
  rating,
}: SmallCardProps) {
  return (
    <Flex gap="10px" className={smallCard({ variant })}>
      {children}
      {variant === "speaker" && rating ? (
        <Float
          placement="top-start"
          offsetY="7px"
          offsetX="40px"
          translate="none"
        >
          <Tag>{rating}</Tag>
        </Float>
      ) : null}
    </Flex>
  );
}

export function SmallCardAvatar({ src, name }: SmallCardAvatarProps) {
  return <Avatar image={src} name={name} />;
}

export function SmallCardContent({
  title,
  description,
}: SmallCardContentProps) {
  return (
    <Flex direction="column" gap="3px">
      <h4>{title}</h4>
      <div className={css({ textStyle: "body.3" })}>{description}</div>
    </Flex>
  );
}
