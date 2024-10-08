import { Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";
import ProjectCard from "../../../../organisms/ProjectCard";
import { Project } from "../../../../../data/types";

const MotionBox = motion.div;

interface ProjectsProps {
  projects: Project[];
  removeProject: (id: string) => void;
}
function Projects({ projects, removeProject }: ProjectsProps) {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(260px, 2fr))"
      justifyItems={"center"}
      mx={"auto"}
      gap={6}
    >
      {projects.map((project) => (
        <MotionBox
          key={project.id}
          layout
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard project={project} onRemove={removeProject} />
        </MotionBox>
      ))}
    </Grid>
  );
}

export default Projects;
