import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  Flex,
  useDisclosure,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Project } from "../../../data/types";
import githubProjects from "../../../data";
import ProjectCard from "../../organisms/ProjectCard";
import AddProjectModal from "../../molecules/AddProjectModal";
import { messages } from "./messages";
import { GoRepo } from "react-icons/go";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import SORT_OPTIONS, {
  SortOption,
} from "../../../constants/sorting-options.constants";
import {
  clearProjectsFromLocalStorage,
  saveProjectsToLocalStorage,
  getProjectsFromLocalStorage,
  saveSortOptionToLocalStorage,
  getSortOptionFromLocalStorage,
} from "../../utils/local-storage";

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const applySort = useCallback(
    (sortOption: SortOption) => {
      const sortedProjects = [...filteredProjects].sort(sortOption.sortFn);
      setProjects(sortedProjects);
      setCurrentSort(sortOption.value);
    },
    [filteredProjects]
  );

  return (
    <Box p="12">
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
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onRemove={removeProject}
          />
        ))}
      </Grid>
      <AddProjectModal isOpen={isOpen} onClose={onClose} onAdd={addProject} />
    </Box>
  );
};

export default MainPage;
