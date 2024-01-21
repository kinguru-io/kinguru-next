import {
  Tag,
  TagLabel,
  TagCloseButton,
  TagProps,
  TagLabelProps,
  TagCloseButtonProps,
} from "@chakra-ui/react";
import { useCallback, MouseEvent, SyntheticEvent } from "react";

export type ChakraTagInputTagProps = TagProps & {
  children: string;
  tagLabelProps?: TagLabelProps;
  tagCloseButtonProps?: TagCloseButtonProps;
  onRemove?(event: SyntheticEvent): void;
};

export default function ChakraTagInputTag({
  children,
  onRemove,

  tagLabelProps,
  tagCloseButtonProps,

  ...props
}: ChakraTagInputTagProps) {
  const onTagCloseButtonClick = tagCloseButtonProps?.onClick;
  const handleClickTagCloseButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onTagCloseButtonClick?.(event);
      if (event.isDefaultPrevented()) return;

      onRemove?.(event);
    },
    [onRemove, onTagCloseButtonClick],
  );
  return (
    <Tag {...props}>
      <TagLabel {...tagLabelProps}>{children}</TagLabel>
      <TagCloseButton
        {...tagCloseButtonProps}
        onClick={handleClickTagCloseButton}
      />
    </Tag>
  );
}
