import React, { useEffect, useState } from "react";
import { Box, Button, Grid, useDisclosure } from "@chakra-ui/react";
import { Project } from "../../../data/types";
import githubProjects from "../../../data";
import ProjectCard from "../../organisms/ProjectCard";
import AddProjectModal from "../../molecules/AddProjectModal";
import { messages } from "./messages";

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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

  return (
    <Box p="4">
      <Button onClick={onOpen} colorScheme="teal" mb="4">
        {messages.ctaAddProject}
      </Button>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {projects.map((project) => (
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
