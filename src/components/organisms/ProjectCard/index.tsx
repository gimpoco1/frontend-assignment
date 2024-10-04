import React from "react";
import { Box, Heading, Flex, IconButton, Link } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { Project } from "../../../data/types";
import { messages } from "./messages";

interface ProjectCardProps {
  project: Project;
  onRemove: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onRemove }) => {
  return (
    <Box
      w="250px"
      h={["150px", "200px"]}
      p="4"
      bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
      borderRadius="18px"
      boxShadow="md"
      position="relative"
      mb="4"
    >
      <IconButton
        aria-label="Remove project"
        icon={<CloseIcon />}
        size="xs"
        position="absolute"
        top="2"
        right="2"
        variant={""}
        onClick={() => onRemove(project.id)}
      />
      <Heading fontSize="headline3">{project.name}</Heading>
      <Flex mt="2" alignItems="center">
        {[...Array(project.rating)].map((_, i) => (
          <AiFillStar key={i} color="gold" />
        ))}
      </Flex>
      <Link
        href={project.url}
        isExternal
        mt="2"
        display="block"
        color="blue.540"
      >
        {messages.viewOnGH}
      </Link>
    </Box>
  );
};

export default ProjectCard;
