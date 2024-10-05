import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Project } from "../../../../../data/types";
import AddProjectModal from "../../../../templates/AddProjectModal";
import {
  getProjectsFromLocalStorage,
  getSortOptionFromLocalStorage,
  saveProjectsToLocalStorage,
  saveSortOptionToLocalStorage,
} from "../../../../utils/local-storage";
import githubProjects from "../../../../../data";
import DarkModeToggle from "../../../../molecules/DarkModeToggle";
import SearchBar from "../../../../organisms/SearchBar";
import SortMenu from "../../../../organisms/SortMenu";
import EmptyState from "../../../../organisms/EmptyState";
import { messages } from "../../messages";

interface HeaderProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProjects: Project[];
}

interface SortOption {
  value: string;
  sortFn: (a: Project, b: Project) => number;
}

function Header({
  projects,
  setProjects,
  searchTerm,
  setSearchTerm,
  filteredProjects,
}: HeaderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentSort, setCurrentSort] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [setProjects]);

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
    [projects, setProjects]
  );

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <Box mb={16}>
      <Heading mb={6} fontSize={{ base: "title3", md: "title2", lg: "title1" }}>
        {messages.title}
      </Heading>
      <DarkModeToggle />
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        align="start"
        mt={4}
        mb={8}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpen={onOpen}
        />

        <SortMenu currentSort={currentSort} applySort={applySort} />
      </Flex>
      {!loading && filteredProjects.length === 0 && (
        <EmptyState setSearchTerm={setSearchTerm} onOpen={onOpen} />
      )}
      <AddProjectModal isOpen={isOpen} onClose={onClose} onAdd={addProject} />
    </Box>
  );
}

export default Header;
