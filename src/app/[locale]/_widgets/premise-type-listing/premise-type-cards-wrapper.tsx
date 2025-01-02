import { css } from "~/styled-system/css";

export function PremiseTypeCardsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax({sizes.36}, 1fr))",
        gap: "2",
        sm: {
          gridTemplateColumns: "repeat(auto-fill, minmax({sizes.xs}, 1fr))",
          gap: "4",
        },
      })}
    >
      {children}
    </div>
  );
}
