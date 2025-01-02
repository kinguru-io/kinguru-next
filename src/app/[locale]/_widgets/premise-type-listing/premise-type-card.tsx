import { useTranslations } from "next-intl";
import {
  getPremiseTypePreviewLink,
  type PremiseType,
} from "@/lib/shared/config/premise-types";
import { Link } from "@/navigation";
import { css } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";

type PremiseTypeCardProps = {
  typeKey: string;
};

export function PremiseTypeCard({ typeKey }: PremiseTypeCardProps) {
  const t = useTranslations();

  return (
    <Link
      style={{
        backgroundImage: `
          ${token.var("gradients.darken-to-bottom-darker")},
          url(${getPremiseTypePreviewLink(typeKey)})
        `,
      }}
      className={css({
        display: "flex",
        padding: 4,
        borderRadius: "lg",
        color: "light",
        fontWeight: "bold",
        minHeight: "40",
        bgPosition: "center",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        md: { paddingBlock: 5, paddingInline: 4, minHeight: "56" },
        _hoverOrFocusVisible: {
          textDecoration: "underline",
        },
      })}
      href={`/premises/${typeKey}`}
    >
      <span
        className={css({
          alignSelf: "flex-end",
          display: "block",
          maxWidth: "full",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          md: { fontSize: "2xl" },
        })}
      >
        {t(`premise_types.${typeKey as PremiseType}`)}
      </span>
    </Link>
  );
}

export function PremiseTypeCardSkeleton() {
  return (
    <div
      className={css({
        display: "flex",
        padding: 4,
        borderRadius: "lg",
        bgImage: "{gradients.darken-to-bottom-darker}",
        color: "light",
        fontWeight: "bold",
        minHeight: "40",
        md: { paddingBlock: 5, paddingInline: 4, minHeight: "56" },
      })}
    >
      <span
        className={css({
          alignSelf: "flex-end",
          display: "block",
          maxWidth: "full",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          md: { fontSize: "2xl" },
        })}
      >
        ...
      </span>
    </div>
  );
}
