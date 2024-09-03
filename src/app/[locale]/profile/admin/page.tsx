import type {
  Manager,
  Organization,
  Premise,
  PremiseResource,
  PremiseSlot,
  Prisma,
  User,
  Venue,
} from "@prisma/client";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import { SlotsSearch } from "./_search";
import { SubSection } from "@/components/common/cards/sub-section";
import { ArrowIcon, Tag } from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { Link } from "@/navigation";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { Flex, Stack } from "~/styled-system/jsx";

type HandledSearchParams = { email?: string; date?: string; status?: string };

async function getSlots(params: HandledSearchParams) {
  const where: Prisma.PremiseSlotWhereInput = {
    type: { not: "blocked_by_admin" },
    user: {
      email: params.email || undefined,
    },
    startTime: {
      gte: params.date ? `${params.date}T00:00:00Z` : undefined,
    },
    status: (params.status as PremiseSlot["status"]) || undefined,
  };

  return prisma.$transaction([
    prisma.premiseSlot.findMany({
      where,
      include: {
        premise: {
          include: {
            resources: true,
            venue: {
              include: {
                manager: true,
              },
            },
          },
        },
        organization: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.premiseSlot.count({ where }),
  ]);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: HandledSearchParams;
}) {
  const [slots, count] = await getSlots(searchParams);

  return (
    <Stack gap="4">
      <SlotsSearch />
      <span>
        Found <b>{count}</b> booked slots
      </span>
      {slots.map((slot) => (
        <Slot key={slot.id} slot={slot} />
      ))}
    </Stack>
  );
}

type SlotProps = {
  slot: PremiseSlot & {
    premise: Premise & {
      resources: PremiseResource[];
      venue: Venue & { manager: Manager[] };
    };
    user: User;
    organization: Organization;
  };
};

const tagColorMap: Record<PremiseSlot["status"], string | undefined> = {
  succeed: "success",
  failed: "danger",
  progress: undefined,
  canceled: "tertiary",
};

function Slot({ slot }: SlotProps) {
  const manager = slot.premise.venue.manager[0];

  return (
    <SubSection>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Link
          className="title"
          href={`/premises/${slot.premise.slug}`}
          target="_blank"
          prefetch={false}
        >
          {slot.premise.name}
          <ArrowIcon
            direction="right"
            className={css({ fontSize: "sm", marginInlineStart: "2" })}
          />
        </Link>
        <Stack gap="1">
          {formatInTimeZone(
            slot.createdAt,
            "UTC",
            "dd.MM.yyyy',' HH:mm:ss 'UTC'",
          )}
          <Tag
            variant="solid"
            alignSelf="flex-end"
            colorPalette={tagColorMap[slot.status]}
          >
            {slot.status}
          </Tag>
        </Stack>
      </Flex>
      <Flex
        gap="6"
        css={{ "& > img": { objectFit: "contain", objectPosition: "top" } }}
      >
        <Image
          src={slot.premise.resources[0].url}
          alt=""
          width={128}
          height={72}
        />
        <Stack gap="2">
          <span>
            Company: <b>{slot.organization.name}</b>
          </span>
          <span>
            Manager:{" "}
            <b>
              {manager.firstname} {manager.lastname}, {manager.email},{" "}
              {manager.phoneNumber}
            </b>
          </span>
          <span>
            User:{" "}
            <b>
              {slot.user.name}, {slot.user.email}
            </b>
          </span>
          <span>
            Amount: <b>{priceFormatter.format(slot.amount / 100)}</b>
          </span>
          {slot.discountAmount > 0 && (
            <span>
              Discount:{" "}
              <b>
                -
                {priceFormatter.format(
                  (slot.amount * slot.discountAmount) / 10000,
                )}
              </b>
            </span>
          )}
          <span>
            When:{" "}
            <b>
              {formatInTimeZone(slot.startTime, "UTC", "dd.MM.yyyy',' HH:mm")} -{" "}
              {formatInTimeZone(slot.endTime, "UTC", "HH:mm")}
            </b>{" "}
            <span className="notice">(local hall time)</span>
          </span>
        </Stack>
      </Flex>
      <a
        className={css({
          _hoverOrFocusVisible: { textDecoration: "underline" },
          alignSelf: "flex-end",
          fontSize: "sm",
        })}
        href={`https://dashboard.stripe.com/payments/${slot.paymentIntentId}`}
        target="_blank"
      >
        Open in{" "}
        <span style={{ color: "rgb(98, 90, 250)", fontWeight: "bold" }}>
          Stripe
        </span>{" "}
        <ArrowIcon
          direction="right"
          className={css({ marginInlineStart: "2" })}
        />
      </a>
    </SubSection>
  );
}
