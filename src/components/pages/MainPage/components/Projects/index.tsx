import { Grid } from "@chakra-ui/react";
import ProjectCard from "../../../../organisms/ProjectCard";
import { Project } from "../../../../../data/types";

function Projects({
  projects,
  removeProject,
}: {
  projects: Project[];
  removeProject: (id: string) => void;
}) {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onRemove={removeProject}
        />
      ))}
    </Grid>
  );
}

export default Projects;
