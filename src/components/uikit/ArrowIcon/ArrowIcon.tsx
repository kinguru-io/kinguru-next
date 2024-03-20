import { ArrowIconVariantProps, arrowIcon } from "~/styled-system/recipes";

export function ArrowIcon({ direction }: ArrowIconVariantProps) {
  return <span className={arrowIcon({ direction })}></span>;
}
