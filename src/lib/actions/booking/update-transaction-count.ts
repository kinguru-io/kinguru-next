"use server";

export const updateTransactionCount = async (userId: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        transactionCount: { increment: 1 },
      },
    });
    return { status: "success", data: updatedUser };
  } catch (error) {
    return { status: "error", message: "Failed to update transaction count" };
  }
};
