import { SimpleGrid } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { PlanCard } from "@/components/pricing/plans";

export const PlanComponent: FC = () => {
  const t = useTranslations();
  const plans = [
    {
      planName: t("pricing.basic_plan"),
      price: 9,
      trial: 1,
      features: [
        t("pricing.basic_plan_features.event_number"),
        t("pricing.basic_plan_features.choose_location"),
        t("pricing.basic_plan_features.attracting_an_audience"),
      ],
    },
    {
      planName: t("pricing.standard_plan"),
      price: 19,
      popular: true,
      features: [
        t("pricing.standard_plan_features.event_number"),
        t("pricing.standard_plan_features.choose_location"),
        t("pricing.standard_plan_features.attracting_an_audience"),
      ],
    },
    {
      planName: t("pricing.pro_plan"),
      price: 39,
      features: [
        t("pricing.pro_plan_features.event_number"),
        t("pricing.pro_plan_features.choose_location"),
        t("pricing.pro_plan_features.attracting_an_audience"),
      ],
    },
  ];
  return (
    <SimpleGrid
      maxW={"4xl"}
      mx={"auto"}
      py={5}
      pb={10}
      gap={[0, 7]}
      columns={[1, 3]}
      alignContent={"end"}
    >
      {plans.map((props) => (
        <PlanCard key={props.planName} {...props} />
      ))}
    </SimpleGrid>
  );
};
