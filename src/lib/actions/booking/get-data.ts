import { BookingType, User } from "@prisma/client";

export async function getBookingsByRole(
  userId: User["id"],
  bookingType: BookingType = "via_website",
) {
  try {
    const bookings = await prisma.premiseSlot.findMany({
      where: {
        userId: userId,
        type: bookingType,
      },
      include: {
        premise: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });
    return bookings;
  } catch (error) {
    console.error("Error retrieving user bookings:", error);
    return [];
  }
}

export async function getBookingsViaWebsite(userId: User["id"]) {
  try {
    const userWithOrganizations = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        organizations: true,
      },
    });

    if (!userWithOrganizations) {
      console.log("User not found");
      return [];
    }

    const organizationIds = userWithOrganizations.organizations.map(
      (org) => org.id,
    );

    const premiseSlots = await prisma.premiseSlot.findMany({
      where: {
        organizationId: {
          in: organizationIds,
        },
        type: "via_website",
      },
      include: {
        premise: true,
        organization: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return premiseSlots;
  } catch (error) {
    console.error(
      "Error retrieving premise slots for user's organizations:",
      error,
    );
    return [];
  }
}

export type GetBookingsByRole = typeof getBookingsByRole;
export type GetBookingsViaWebsite = typeof getBookingsViaWebsite;
