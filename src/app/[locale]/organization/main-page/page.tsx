import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { Avatar, Button, Tag } from "@/components/uikit";
import { OrganizationMainInfoLayout } from "@/layout/block/organization/main-page/OrganizationMainInfoLayout";
import { OrganizationWelcomeLayout } from "@/layout/block/organization/main-page/OrganizationWelcomeLayout";
import { css } from "~/styled-system/css";
import { Box, Flex, GridItem, VStack } from "~/styled-system/jsx";

export default async function OrganizationMainPage() {
  const session = await getSession();
  const t = await getTranslations("organization.main_page");

  if (!session || !session.user) return notFound();
  //if (session.user.role !== "organization") return notFound();

  const { image, name } = session.user;

  const faq = [
    "Как добавить площадку",
    "Как организовать мероприятие в своей локации",
    "Как изменить фото профиля",
    "Какие условия сотрудничества",
  ];

  return (
    <Box paddingBlock="70px 108px">
      <OrganizationWelcomeLayout>
        <Avatar size="md" image={image || ""} name={name || ""} />
        <VStack gap="0">
          <h1>{t("hello")}</h1>
          <span className={css({ textStyle: "body.1" })}>
            {t("collected_all_important_things")}
          </span>
        </VStack>
        <Button size="md">{t("add_venue")}</Button>
      </OrganizationWelcomeLayout>

      <OrganizationMainInfoLayout>
        <GridItem gridArea="1 / 1 / 4 / 2">
          <Box bg="neutral.2" h="100%">
            Insert Callendar
          </Box>
        </GridItem>
        <GridItem
          maxW="670px"
          gridArea="1 / 2 / 2 / 4"
          p="17px"
          borderRadius="10px"
          border="1px solid"
          borderColor="neutral.4"
        >
          <VStack gap="15px" alignItems="start">
            <h6>Вам что-то не понятно? Давайте разбираться!</h6>
            <Flex flexWrap="wrap" gap="15px">
              {faq.map((question) => (
                <Button key={question} variant="outline">
                  {question}
                </Button>
              ))}
            </Flex>
            <Flex justify="space-between" w="100%">
              <Button variant="ghost" size="sm">
                <span className={css({ color: "neutral.3" })}>
                  Смотреть еще
                </span>
              </Button>
              <Button variant="ghost" size="sm">
                <span className={css({ color: "neutral.3" })}>
                  Задать свой вопрос
                </span>
              </Button>
            </Flex>
          </VStack>
        </GridItem>
        <GridItem
          maxW="670px"
          gridArea="2 / 2 / 3 / 4"
          p="17px"
          borderRadius="10px"
          border="1px solid"
          borderColor="neutral.4"
        >
          <VStack gap="15px" w="100%" alignItems="start">
            <h6>Уведомления</h6>
            <VStack gap="5px" alignItems="stretch" w="100%">
              <Tag variant="secondary" size="sm">
                01.01.2024 | Оплата прошла
              </Tag>
              <Tag variant="secondary" size="sm">
                01.01.2024 | Оплата прошла
              </Tag>
              <Tag variant="secondary" size="sm">
                01.01.2024 | Оплата прошла
              </Tag>
            </VStack>
          </VStack>
        </GridItem>
        <GridItem
          maxW="670px"
          gridArea="3 / 2 / 4 / 4"
          p="17px"
          borderRadius="10px"
          border="1px solid"
          borderColor="neutral.4"
        >
          <Flex w="100%" h="100%" align="center" justify="center">
            <span className={css({ textStyle: "body.2", maxW: "251px" })}>
              Чуть позже здесь будет отображаться информация о наполненности
              профиля
            </span>
          </Flex>
        </GridItem>
      </OrganizationMainInfoLayout>
    </Box>
  );
}
