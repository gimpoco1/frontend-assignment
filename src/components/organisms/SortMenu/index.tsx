import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckIcon } from "@chakra-ui/icons";
import SORT_OPTIONS from "../../../constants/sorting-options.constants";
import { messages } from "../messages";
const { sortMenuMessages } = messages;

const SortMenu = ({
  currentSort,
  applySort,
}: {
  currentSort: string | null;
  applySort: (sortOption: any) => void;
}) => (
  <Flex
    w={{ base: "100%", lg: "30%" }}
    flexDirection="column"
    mt={{ base: 4, lg: 0 }}
  >
    <Menu>
      <Flex justifyContent={{ base: "start", lg: "end" }}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="cyan"
          variant="outline"
          borderRadius={"sm"}
          w={"fit-content"}
        >
          {sortMenuMessages.ctaSort}
        </MenuButton>
      </Flex>
      <MenuList borderRadius="0">
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => applySort(option)}
            icon={currentSort === option.value ? <CheckIcon /> : undefined}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
    {currentSort && (
      <Flex justifyContent={{ base: "start", lg: "end" }} mt={2}>
        <HStack pt={{ base: 0, lg: 2 }}>
          <Text fontSize="md" fontWeight="semibold">
            {sortMenuMessages.sortedBy}
          </Text>
          <Text fontSize="md" color="gray.600">
            {currentSort}
          </Text>
        </HStack>
      </Flex>
    )}
  </Flex>
);

export default SortMenu;
