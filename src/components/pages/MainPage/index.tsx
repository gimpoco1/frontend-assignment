import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Project } from "../../../data/types";
import Header from "./components/Header";
import Projects from "./components/Projects";

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Box p="12" maxW={"1350px"} mx={"auto"}>
      <Header projects={projects} setProjects={setProjects} />
      <Projects projects={projects} removeProject={removeProject} />
    </Box>
  );
};

export default MainPage;
