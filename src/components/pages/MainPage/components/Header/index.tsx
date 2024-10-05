import {
  Box,
  Button,
  filter,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { messages } from "../../messages";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SORT_OPTIONS, {
  SortOption,
} from "../../../../../constants/sorting-options.constants";
import { RiGitRepositoryLine } from "react-icons/ri";
import { Project } from "../../../../../data/types";
import AddProjectModal from "../../../../molecules/AddProjectModal";
import {
  getProjectsFromLocalStorage,
  getSortOptionFromLocalStorage,
  saveProjectsToLocalStorage,
  saveSortOptionToLocalStorage,
} from "../../../../utils/local-storage";
import githubProjects from "../../../../../data";
import { FaSun, FaMoon } from "react-icons/fa";

function Header({
  projects,
  setProjects,
  searchTerm,
  setSearchTerm,
  filteredProjects,
}: {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProjects: Project[];
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentSort, setCurrentSort] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage.clear();
    const savedProjects = getProjectsFromLocalStorage();
    const savedSort = getSortOptionFromLocalStorage();

    if (savedProjects && Array.isArray(savedProjects)) {
      setProjects(savedProjects);
    } else {
      setProjects(githubProjects);
    }

    if (savedSort) {
      setCurrentSort(savedSort);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      saveProjectsToLocalStorage(projects);
    }
  }, [projects, loading]);

  useEffect(() => {
    if (currentSort) {
      saveSortOptionToLocalStorage(currentSort);
    } else {
      saveSortOptionToLocalStorage("");
    }
  }, [currentSort]);

  const applySort = useCallback(
    (sortOption: SortOption) => {
      const sortedProjects = [...projects].sort(sortOption.sortFn);
      setProjects(sortedProjects);
      setCurrentSort(sortOption.value);
    },
    [projects]
  );

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <Box mb={16}>
      <Heading mb={6} fontSize={{ base: "title3", md: "title2", lg: "title1" }}>
        {messages.title}
      </Heading>
      <IconButton
        aria-label="Toggle dark mode"
        icon={
          colorMode === "light" ? <FaMoon size={22} /> : <FaSun size={22} />
        }
        onClick={toggleColorMode}
        variant={""}
        position={"absolute"}
        top={4}
        right={4}
      />
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        align={"start"}
        mb={8}
        gap={{ base: 4, lg: 0 }}
      >
        <Flex w={{ base: "100%", lg: "70%" }} alignItems="center">
          <Input
            placeholder={messages.searchPlaceholder}
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
            {messages.ctaAddProject}
          </Button>
        </Flex>

        <Stack w={{ base: "100%", lg: "30%" }}>
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
                {messages.ctaSort}
              </MenuButton>
            </Flex>
            <MenuList borderRadius="0">
              {SORT_OPTIONS.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => applySort(option)}
                  icon={
                    currentSort === option.value ? <CheckIcon /> : undefined
                  }
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {currentSort && (
            <Flex justifyContent={{ base: "start", lg: "end" }}>
              <HStack pt={{ base: 0, lg: 2 }} justifyContent="space-between">
                <HStack>
                  <Text
                    fontSize="md"
                    whiteSpace={"nowrap"}
                    fontWeight={"semibold"}
                  >
                    {messages.sortedBy}
                  </Text>
                  <Text fontSize="md" whiteSpace={"nowrap"} color="gray.600">
                    {currentSort}
                  </Text>
                </HStack>
              </HStack>
            </Flex>
          )}
        </Stack>
      </Flex>
      {!loading && filteredProjects.length === 0 ? (
        <Box textAlign="center" py={20} px={6}>
          <Heading
            fontSize="title2"
            color={colorMode === "light" ? "blackAlpha.700" : "gray.400"}
          >
            {messages.noProjectsFound}
          </Heading>
          <Text
            fontSize="headline3"
            color={colorMode === "light" ? "blackAlpha.600" : "gray.400"}
            mb={4}
          >
            {messages.noProjectsFound2}
          </Text>
          <HStack justifyContent={"center"}>
            <Button
              onClick={() => setSearchTerm("")}
              colorScheme="teal"
              variant={"ghost"}
              borderRadius="12px"
            >
              {messages.ctaClearFilters}
            </Button>
            <Button
              onClick={onOpen}
              colorScheme="teal"
              borderRadius="12px"
              variant={"solid"}
            >
              {messages.addNewProject}
            </Button>
          </HStack>
        </Box>
      ) : null}
      <AddProjectModal isOpen={isOpen} onClose={onClose} onAdd={addProject} />
    </Box>
  );
}

export default Header;
