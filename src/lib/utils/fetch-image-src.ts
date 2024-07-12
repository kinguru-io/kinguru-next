export async function fetchImageSrc(premiseId: string) {
  const premise = await prisma.premise.findFirst({
    where: { id: premiseId },
    select: { resources: true },
  });
  return premise?.resources[0]?.url || "";
}
