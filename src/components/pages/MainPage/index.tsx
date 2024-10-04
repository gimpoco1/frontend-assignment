import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Project } from "../../../data/types";
import githubProjects from "../../../data";
import ProjectCard from "../../organisms/ProjectCard";
import AddProjectModal from "../../molecules/AddProjectModal";
import { messages } from "./messages";
import { GoRepo } from "react-icons/go";

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(githubProjects);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p="12">
      <Flex justifyContent="start" alignItems="center" mb="12">
        <Input
          placeholder="Find a project..."
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
