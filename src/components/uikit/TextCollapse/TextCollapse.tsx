import { css } from "~/styled-system/css";

type TextCollapseProps = {
  isShown: boolean;
  textContent: string;
  visibleCharsCount: number;
};

export function TextCollapse({
  isShown,
  textContent,
  visibleCharsCount,
}: TextCollapseProps) {
  if (textContent.length <= visibleCharsCount) {
    return <p>{textContent}</p>;
  }

  const closestEndSpaceIdx = textContent.lastIndexOf(" ", visibleCharsCount);
  const closestEndNewLineIdx = textContent.lastIndexOf("\n", visibleCharsCount);
  const sliceTo = Math.max(closestEndSpaceIdx, closestEndNewLineIdx);

  const hiddenPart = textContent.slice(sliceTo);
  const visiblePart = textContent
    .slice(0, sliceTo)
    .concat(isShown ? "" : "...");

  return (
    <p>
      {visiblePart}
      <span
        className={css({
          display: "grid",
          gridTemplateRows: "0fr",
          transition: "grid-template-rows 350ms",
          "&[data-shown=true]": {
            gridTemplateRows: "1fr",
          },
        })}
        data-shown={isShown}
      >
        <span className={css({ overflow: "hidden" })}>{hiddenPart}</span>
      </span>
    </p>
  );
}
