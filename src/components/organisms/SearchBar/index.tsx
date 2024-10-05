import { Flex, Input, Button } from "@chakra-ui/react";
import { RiGitRepositoryLine } from "react-icons/ri";
import { messages } from "../messages";
const { searchBarMessages } = messages;

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpen: () => void;
}
const SearchBar = ({ searchTerm, setSearchTerm, onOpen }: SearchBarProps) => (
  <Flex w={{ base: "100%", lg: "70%" }} alignItems="center">
    <Input
      placeholder={searchBarMessages.searchPlaceholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      maxW="400px"
      mr="4"
      borderRadius="12px"
    />
    <Button
      onClick={onOpen}
      leftIcon={<RiGitRepositoryLine size={20} />}
      borderRadius="12px"
      bgColor="#f0e68c"
      color={"black"}
      fontWeight={"semibold"}
      _hover={{ bgColor: "#e6db74" }}
      _active={{ bgColor: "black", color: "#e6db74" }}
    >
      {searchBarMessages.ctaAddProject}
    </Button>
  </Flex>
);

export default SearchBar;
