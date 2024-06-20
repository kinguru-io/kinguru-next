import { Link } from "@/navigation";
import { Circle, InlineBox, VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export function WarningNotice({
  noticeText,
  href,
  linkLabel,
}: {
  noticeText: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <VStack gridColumn="1 / -1" marginInline="auto" maxWidth="440px" gap="20px">
      <VStack
        gap="20px"
        layerStyle="outlinePrimaryWrapper"
        padding="30px 25px"
        textAlign="center"
        color="neutral.0"
        textStyle="heading.6"
      >
        <Circle size="2em" color="neutral.5" bgColor="primary" aria-hidden>
          !
        </Circle>
        <InlineBox>{noticeText}</InlineBox>
      </VStack>
      <Link className={button()} href={href}>
        {linkLabel}
      </Link>
    </VStack>
  );
}
