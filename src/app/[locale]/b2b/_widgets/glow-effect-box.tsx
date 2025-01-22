import { css } from "~/styled-system/css";

export function GlowEffectBox({ size }: { size: number }) {
  return (
    <span
      style={{ "--size": `${size}px` } as React.CSSProperties}
      className={css({
        boxShadow: "0 0 calc(var(--size) * 1) var(--size) {colors.primary}",
      })}
      aria-hidden
    />
  );
}
