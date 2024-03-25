import { Tag } from "../uikit";
import { Flex } from "~/styled-system/jsx";

type PremiseAmenitiesProps = {
  amenities: string[];
};

export function PremiseAmenities({ amenities }: PremiseAmenitiesProps) {
  return (
    <Flex gap="23px" wrap="wrap">
      {amenities.map((elem, i) => (
        <Tag variant="additional" size="md" key={i}>
          {elem}
        </Tag>
      ))}
    </Flex>
  );
}
