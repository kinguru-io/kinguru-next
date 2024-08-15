import type { Premise, PremiseSlot } from "@prisma/client";
import { getSession } from "@/auth";

export async function isUserOwnerOfPremise(
  premiseOrgId: string,
): Promise<boolean> {
  const session = await getSession();
  // Check if the current user is the owner
  const isOwner =
    session?.user?.organizations?.some((org) => org?.id === premiseOrgId) ??
    false;

  return isOwner;
}

type UserType = "user" | "organization";

export const USER_ROLE: UserType = "user";
export const ORGANIZATION_ROLE: UserType = "organization";

export async function getUserRole() {
  const session = await getSession();
  return session?.user?.role;
}

export async function isUserOrganization() {
  return (await getUserRole()) === ORGANIZATION_ROLE;
}
export type Booking = PremiseSlot & {
  ids?: string[];
  premise: Premise;
};

export type MergedTimeSlots = {
  premiseId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  price: number;
  discountAmount: number;
};

export function groupAndMergeTimeslots(
  bookings: MergedTimeSlots[],
): MergedTimeSlots[] {
  // Step 1: Group bookings by premiseId and date
  const groupedBookings: { [key: string]: MergedTimeSlots[] } = {};

  bookings.forEach((booking) => {
    const key = `${booking.premiseId}_${booking?.startTime?.getDate()}`;
    if (!groupedBookings[key]) {
      groupedBookings[key] = [];
    }
    groupedBookings[key].push(booking);
  });

  // Step 2: Merge times within each group
  const mergedBookings: MergedTimeSlots[] = [];

  for (const key in groupedBookings) {
    const group = groupedBookings[key];

    // Sort bookings by start time
    group.sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    );

    let currentBooking = group[0];

    for (let i = 1; i < group.length; i++) {
      const nextBooking = group[i];
      const currentEndTime = new Date(currentBooking.endTime).getTime();
      const nextStartTime = new Date(nextBooking.startTime).getTime();
      const nextEndTime = new Date(nextBooking.endTime).getTime();

      // If times are overlapping or consecutive, merge them
      if (currentEndTime >= nextStartTime) {
        currentBooking.endTime = new Date(
          Math.max(currentEndTime, nextEndTime),
        );
        currentBooking.price += nextBooking.price;
      } else {
        mergedBookings.push(currentBooking);
        currentBooking = nextBooking;
      }
    }

    mergedBookings.push(currentBooking);
  }

  // Sort merged bookings by start time before returning
  mergedBookings.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  return mergedBookings;
}
