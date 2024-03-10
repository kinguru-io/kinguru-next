import { ArrowIconVariantProps, arrowIcon } from "~/styled-system/recipes";

export function ArrowIcon({ direction }: ArrowIconVariantProps) {
  return <div className={arrowIcon({ direction })}></div>;
}
