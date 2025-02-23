"use server";

import { getSession } from "@/auth";
import { DEFAULT_TAX } from "@/lib/shared/constants";
import { priceFormatter } from "@/lib/utils/format-price";

export const formatPriceWithTax = async (
  value: number | bigint | string,
): Promise<string> => {
  const session = await getSession();
  try {
    const numericValue =
      typeof value === "string" ? parseFloat(value) : Number(value);

    if (isNaN(numericValue)) {
      return priceFormatter.format(0);
    }

    if (!session?.user?.id) {
      return priceFormatter.format(numericValue);
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isRegisteredFromUntaxedForm: true, transactionCount: true },
    });

    if (user?.isRegisteredFromUntaxedForm && user.transactionCount >= 5) {
      const valueWithTax = numericValue * DEFAULT_TAX;
      return priceFormatter.format(valueWithTax);
    }

    return priceFormatter.format(numericValue);
  } catch (error) {
    console.error("Error in formatPriceWithTax:", error);
    return priceFormatter.format(0); // Fallback
  }
};
export const calculatePriceWithTax = async (
  value: number | bigint | string,
): Promise<number> => {
  const session = await getSession();
  let numericValue: number = 0; // Initialize with 0

  try {
    numericValue =
      typeof value === "string" ? parseFloat(value) : Number(value);

    if (isNaN(numericValue)) {
      return 0;
    }

    if (!session?.user?.id) {
      return numericValue;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isRegisteredFromUntaxedForm: true, transactionCount: true },
    });

    if (user?.isRegisteredFromUntaxedForm && user.transactionCount >= 5) {
      return numericValue * DEFAULT_TAX;
    }

    return numericValue;
  } catch (error) {
    console.error("Error in calculatePriceWithTax:", error);
    return numericValue; // No need for ?? since it's always defined
  }
};
