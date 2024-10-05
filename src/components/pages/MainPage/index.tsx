import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Project } from "../../../data/types";
import Header from "./components/Header";
import Projects from "./components/Projects";

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <Box p="12" maxW={"1440px"} mx={"auto"}>
      <Header
        projects={projects}
        setProjects={setProjects}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredProjects={filteredProjects}
      />
      <Projects projects={filteredProjects} removeProject={removeProject} />
    </Box>
  );
};

export default MainPage;
