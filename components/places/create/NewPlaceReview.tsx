import { Button, HStack, useToast, VStack } from "@chakra-ui/react";
import { TRPCError } from "@trpc/server";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { trpc } from "@/utils/trpc.ts";
import { useLocale } from "@/utils/use-locale.ts";

export function NewPlaceReview({
  activeStep,
  setActiveStep,
}: {
  activeStep?: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
}) {
  const { t } = useLocale();
  const toast = useToast();
  const { mutateAsync: createPlace, isLoading } =
    trpc.places.createPlace.useMutation();
  const router = useRouter();
  return (
    <VStack>
      <HStack w={"full"} justifyContent={"center"}>
        {activeStep !== 0 ? (
          <Button
            variant={"secondary"}
            onClick={() => {
              setActiveStep && setActiveStep((activeStep || 0) - 1);
            }}
          >
            {t("events.new_event_prev")}
          </Button>
        ) : null}
        <Button
          variant={"primary"}
          isLoading={isLoading}
          onClick={() => {
            try {
              void createPlace({
                name: "123",
              }).then((result) => {
                if (result instanceof TRPCError) {
                  toast({
                    title: t("places.new_places_was_not_created"),
                    description: t(
                      "places.new_places_was_not_created_description",
                    ),
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  return;
                }
                toast({
                  title: t("places.new_places_was_created"),
                  description: t("places.new_places_was_created_description"),
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
                router.push(`/places/${result.id}`);
              });
            } catch (e) {
              toast({
                title: t("places.new_places_was_not_created"),
                description: t("places.new_places_was_not_created_description"),
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }}
        >
          {t("events.new_event_create_event")}
        </Button>
      </HStack>
    </VStack>
  );
}
