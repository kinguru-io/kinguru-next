import slugify from "@sindresorhus/slugify";

export async function getPremiseSlug(name: string) {
  const slug = slugify(name);

  const checkPremise = await prisma.premise.findUnique({ where: { slug } });

  if (!checkPremise) return slug;

  // The code below makes slug to follow incremental naming. E.g. `slug-1`, `slug-2`. Edge cases are not tested

  // const newSlug = slug.replace(/(?<=-)\d+$/m, (x) => String(Number(x) + 1));
  // return getPremiseSlug(newSlug === slug ? `${slug}-1` : newSlug);

  return getPremiseSlug(slug + "-1");
}
