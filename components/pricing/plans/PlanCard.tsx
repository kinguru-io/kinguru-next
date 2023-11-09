import {
  Container,
  Heading,
  Text,
  Stack,
  ListItem,
  ListIcon,
  List,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { useLocale } from "@/utils/use-locale.ts";

export const PlanCard: FC<{
  planName: string;
  price: number;
  trial?: number;
  popular?: boolean;
  features?: string[];
}> = ({ planName, price, trial, features, popular }) => {
  const { t } = useLocale();
  return (
    <Container p={0} m={0} mt={3} px={[3, 0]}>
      {!popular && <Stack h={[0, "2rem"]} />}
      <Container
        h={["100%", !popular ? "calc(100% - 2rem)" : "100%"]}
        p={0}
        bgColor={"#ffd8001a"}
        borderColor={"brand.primary"}
        borderWidth={3}
        borderRadius={10}
        as={Flex}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <div>
          {popular && (
            <Text
              textAlign={"center"}
              textTransform={"uppercase"}
              fontSize={"sm"}
              fontWeight={"bold"}
              py={2}
              bg={"brand.primary"}
            >
              {t("pricing.popular")}
            </Text>
          )}

          <Heading
            p={6}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontSize={"2xl"}
          >
            {planName}
          </Heading>
          <Heading textAlign={"center"} fontSize={"5xl"}>
            {price}$
          </Heading>
          {trial ? (
            <Text textAlign={"center"} fontSize={"sm"} fontWeight={"bold"}>
              {t("pricing.free")} {trial} {t("pricing.trial")}
            </Text>
          ) : (
            <Text textAlign={"center"} fontSize={"sm"} fontWeight={"bold"}>
              {t("pricing.per_month")}
            </Text>
          )}
          <List p={6} spacing={3}>
            {features?.map((feature) => (
              <ListItem key={feature} as={Flex} alignItems={"center"}>
                <ListIcon as={FaPlus} mr={5} />
                <Text wordBreak={"break-word"}>{feature}</Text>
              </ListItem>
            ))}
          </List>
        </div>

        <Flex w={"full"} justifyContent={"center"} pb={5}>
          <Button variant={"primary"} mx={"auto"}>
            {t("pricing.buy")}
          </Button>
        </Flex>
      </Container>
    </Container>
  );
};
