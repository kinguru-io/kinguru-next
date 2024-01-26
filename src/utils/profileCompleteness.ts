import { User } from "@prisma/client";

export const profileProgressMap: Partial<Record<keyof User, number>> = {
  country: 5,
  city: 5,
  birthdate: 5,
  phoneNumber: 5,
  instagram: 5,
  telegram: 5,
  facebook: 5,
  vk: 5,
  interests: 10,
  company: 10,
  position: 10,
  description: 20,
};

export const calculateCompleteness = (user: User) => {
  return (Object.keys(user) as (keyof User)[]).reduce(
    (completeness, key: keyof User) => {
      const procent = profileProgressMap[key] || 0;
      return completeness + (user[key] ? procent : 0);
    },
    0,
  );
};
