import { Link } from "@/navigation";
import { Circle, VStack } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export function NoticeScreen({
  noticeText,
  href,
  linkLabel,
}: {
  noticeText: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <VStack gap="6" paddingBlock="6">
      <VStack gap="4" textAlign="center" maxWidth="md" fontSize="sm">
        <Circle
          size="16"
          css={{
            bgColor: "primary",
            fontWeight: "bold",
            fontSize: "2xl",
          }}
          aria-hidden
        >
          !
        </Circle>
        {noticeText}
      </VStack>
      <Link className={button({ size: "lg" })} href={href}>
        {linkLabel}
      </Link>
    </VStack>
  );
}
