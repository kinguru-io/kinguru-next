import { Collapse, type CollapseProps } from "@/components/uikit";

type TextCollapseProps = Pick<CollapseProps, "isShown"> & {
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
      <Collapse isShown={isShown}>{hiddenPart}</Collapse>
    </p>
  );
}
