import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { SubSection } from "@/components/common/cards/sub-section";
import { Icon } from "@/components/uikit";
import { redirect } from "@/navigation";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { Center } from "~/styled-system/jsx";
import { button } from "~/styled-system/recipes";

export default async function CreatedNoticePage({
  searchParams: { venueId },
}: {
  searchParams: { venueId?: string };
}) {
  if (!venueId) {
    redirect("/profile/venues");
  }

  const t = await getTranslations("profile.venues.created");
  const session = await getSession();

  const organization = session?.user?.organizations.at(0);

  const venue = await prisma.venue.findUnique({
    where: { id: venueId, organizationId: organization?.id },
  });

  if (!venue) {
    redirect("/profile/venues");
  }

  return (
    <SubSection>
      <Center flexDirection="column" gap="5" textAlign="center">
        <Icon
          name="action/tick-double"
          className={css({
            fontSize: "3xl",
            padding: "5",
            borderRadius: "full",
            bgColor: "success",
            color: "light",
          })}
        />
        <span className={css({ fontSize: "4xl", fontWeight: "bold" })}>
          {t("congrats_label")}
        </span>
        <span className={css({ fontSize: "px17" })}>{t("complete_label")}</span>
        <span className={css({ fontSize: "sm", maxWidth: "md" })}>
          {t("no_premise_warn_msg")}
        </span>
        <Link
          className={button({ size: "lg" })}
          href={`/profile/venues/${venueId}/add-premise`}
        >
          {t("no_premise_link_label")}
        </Link>
        <Link
          className={css({
            fontSize: "sm",
            padding: "1",
            color: "secondary",
            textDecoration: "underline",
            _hoverOrFocusVisible: { textDecoration: "none" },
          })}
          href={`/venues/${venue?.slug}`}
        >
          {t("check_venue", { name: venue?.name })}
        </Link>
      </Center>
    </SubSection>
  );
}
