import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { messages } from "../../messages";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SORT_OPTIONS, {
  SortOption,
} from "../../../../../constants/sorting-options.constants";
import { GoRepo } from "react-icons/go";
import { Project } from "../../../../../data/types";
import AddProjectModal from "../../../../molecules/AddProjectModal";
import {
  getProjectsFromLocalStorage,
  getSortOptionFromLocalStorage,
  saveProjectsToLocalStorage,
  saveSortOptionToLocalStorage,
} from "../../../../utils/local-storage";
import githubProjects from "../../../../../data";

function Header({
  projects,
  setProjects,
}: {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [currentSort, setCurrentSort] = useState<string | null>(null);

  useEffect(() => {
    const savedProjects = getProjectsFromLocalStorage();
    const savedSort = getSortOptionFromLocalStorage();

    if (savedProjects) {
      setProjects(savedProjects);
    } else {
      setProjects(githubProjects);
    }
    if (savedSort) {
      setCurrentSort(savedSort);
    }
  }, []);

  useEffect(() => {
    saveProjectsToLocalStorage(projects);
  }, [projects]);

  useEffect(() => {
    if (currentSort) {
      saveSortOptionToLocalStorage(currentSort);
    } else {
      saveSortOptionToLocalStorage("");
    }
  }, [currentSort]);

  const applySort = useCallback(
    (sortOption: SortOption) => {
      const sortedProjects = [...filteredProjects].sort(sortOption.sortFn);
      setProjects(sortedProjects);
      setCurrentSort(sortOption.value);
    },
    [filteredProjects]
  );
  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };
  return (
    <Box>
      <Heading mb={6} fontSize={"title1"}>
        {messages.title}
      </Heading>
      <Flex justifyContent="start" alignItems="center" mb="8">
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
          leftIcon={<GoRepo />}
          borderRadius="12px"
          colorScheme="teal"
        >
          {messages.ctaAddProject}
        </Button>
      </Flex>

      <Stack pb={8}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="teal"
            variant="outline"
            borderRadius={"sm"}
            w={"fit-content"}
          >
            {messages.ctaSort}
          </MenuButton>
          <MenuList>
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
          <HStack pt={2} justifyContent="space-between">
            <HStack>
              <Text fontSize="md" fontWeight={"bold"}>
                {messages.sortedBy}
              </Text>
              <Text fontSize="md" color="gray.600">
                {currentSort}
              </Text>
            </HStack>
          </HStack>
        )}
      </Stack>
      <AddProjectModal isOpen={isOpen} onClose={onClose} onAdd={addProject} />
    </Box>
  );
}

export default Header;
