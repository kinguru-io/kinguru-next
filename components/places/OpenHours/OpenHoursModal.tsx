import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useLocale } from "@/utils/use-locale.ts";

export const daysOfTheWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export function OpenHoursModal({
  isOpen,
  onDone,
  onClose,
}: {
  isOpen: boolean;
  onDone: (
    timepickerValues: ({ start: string; end: string }[] | null)[],
  ) => void;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const activeDaysState = daysOfTheWeek.map(() => {
    const [value, set] = useState(false);
    return {
      value,
      set,
    };
  });
  const isTimepickerDisabled = !activeDaysState.some(({ value }) => value);
  const [timepickerInputs, setTimepickerInputs] = useState([
    { start: "", end: "" },
  ]);
  const isAddMoreButtonDisabled =
    isTimepickerDisabled ||
    !timepickerInputs.every(({ start, end }) => start.length && end.length);

  const gracefulClose = () => {
    activeDaysState.forEach(({ set }) => set(false));
    setTimepickerInputs([{ start: "", end: "" }]);
    onClose();
  };

  const handleTimepickerChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    let data = [...timepickerInputs];
    data[index][event.target.name as "start" | "end"] = event.target.value;
    setTimepickerInputs(data);
  };
  return (
    <Modal onClose={gracefulClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("places.hours_change_modal")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack mb={5}>
            {daysOfTheWeek.map((day, i) => {
              return (
                <Flex
                  key={day}
                  w={"50px"}
                  h={"50px"}
                  borderRadius={"full"}
                  bg={activeDaysState[i].value ? "brand.primary" : "gray.200"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  transition={"0.2s"}
                  cursor={"pointer"}
                  _hover={{
                    bg: activeDaysState[i].value
                      ? "brand.primaryActive"
                      : "gray.300",
                  }}
                  onClick={() =>
                    activeDaysState[i].set(!activeDaysState[i].value)
                  }
                >
                  <Text fontWeight={"500"}>
                    {t(`places.hours_${day.toLocaleLowerCase()}_short`)}
                  </Text>
                </Flex>
              );
            })}
          </HStack>
          <VStack>
            {timepickerInputs.map((timepicker, index) => (
              <SimpleGrid
                columns={2}
                w={"full"}
                key={`hours-${index}`}
                spacing={5}
                mb={5}
              >
                <FormControl>
                  <FormLabel>{t("places.hours_start")}</FormLabel>
                  <Input
                    type={"time"}
                    name={"start"}
                    isDisabled={isTimepickerDisabled}
                    variant={"brand"}
                    value={timepicker.start}
                    onChange={(e) => handleTimepickerChange(index, e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t("places.hours_end")}</FormLabel>
                  <Input
                    type={"time"}
                    name={"end"}
                    isDisabled={isTimepickerDisabled}
                    variant={"brand"}
                    value={timepicker.end}
                    onChange={(e) => handleTimepickerChange(index, e)}
                  />
                </FormControl>
              </SimpleGrid>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant={"secondary"}
            mr={3}
            isDisabled={isAddMoreButtonDisabled}
            onClick={() =>
              setTimepickerInputs([...timepickerInputs, { start: "", end: "" }])
            }
          >
            {t("places.add_more")}
          </Button>
          <Button
            variant={"primary"}
            isDisabled={isAddMoreButtonDisabled}
            onClick={() => {
              onDone(
                activeDaysState.map(({ value }) =>
                  value ? timepickerInputs : null,
                ),
              );
              gracefulClose();
            }}
          >
            {t("places.done")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
