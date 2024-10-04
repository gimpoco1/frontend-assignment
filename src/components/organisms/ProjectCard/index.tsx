import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Flex,
  IconButton,
  Link,
  useColorModeValue,
  HStack,
  ScaleFade,
  useDisclosure,
  VStack,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { Project } from "../../../data/types";
import { messages } from "./messages";
import { LuExternalLink } from "react-icons/lu";
import { bgColors } from "../../../constants/bg-colors.constants";

interface ProjectCardProps {
  project: Project;
  onRemove: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onRemove }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState(
    localStorage.getItem(`bgColor-${project.id}`) ||
      bgColors[Math.floor(Math.random() * bgColors.length)]
  );
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    localStorage.setItem(`bgColor-${project.id}`, bgColor);
  }, [bgColor, project.id]);

  const handleChangeColor = (color: string) => {
    setBgColor(color);
    onClose();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Box
      ref={cardRef}
      w="280px"
      h="220px"
      p="6"
      bg={bgColor}
      borderRadius="24px"
      boxShadow="xl"
      position="relative"
      mb="8"
      transition="transform 0.3s ease-in-out"
      _hover={{ transform: "scale(1.07)" }}
    >
      <IconButton
        aria-label="Remove project"
        icon={<CloseIcon />}
        size="xs"
        position="absolute"
        top="2"
        right="2"
        variant="ghost"
        onClick={() => onRemove(project.id)}
      />
      <Box
        position="absolute"
        bottom="4"
        right="4"
        w="28px"
        h="28px"
        bg={bgColor}
        borderRadius="full"
        border="1px solid"
        borderColor={useColorModeValue("blackAlpha.600", "whiteAlpha.800")}
        cursor="pointer"
        onClick={onToggle}
        boxShadow="lg"
        _hover={{ boxShadow: "xl" }}
      />
      {isOpen && (
        <ScaleFade initialScale={0.9} in={isOpen}>
          <VStack
            position="absolute"
            top="-16"
            right="-4"
            spacing="2"
            p="3"
            bg="white"
            borderRadius="lg"
            boxShadow="xl"
            border={"1px solid"}
            borderColor={"blackAlpha.400"}
          >
            {bgColors.map((color) => (
              <Box
                key={color}
                w="24px"
                h="24px"
                bg={color}
                borderRadius="full"
                cursor="pointer"
                onClick={() => handleChangeColor(color)}
                border={
                  bgColor === color
                    ? "2px solid black"
                    : "2px solid transparent"
                }
              />
            ))}
          </VStack>
        </ScaleFade>
      )}
      <Heading
        fontSize="2xl"
        mt="4"
        mb="4"
        color={useColorModeValue("gray.800", "white")}
        textAlign="center"
      >
        {project.name}
      </Heading>
      <Flex alignItems="center" justifyContent="center" mb="4">
        {[...Array(project.rating)].map((_, i) => (
          <AiFillStar key={i} color="gold" size="20px" />
        ))}
      </Flex>
      <Link
        href={project.url}
        isExternal
        display="block"
        color="blackAlpha.700"
        fontWeight="light"
        fontSize="body2"
        _hover={{ textDecoration: "underline" }}
      >
        <HStack justifyContent="center">
          <Text>{messages.viewOnGH}</Text>
          <LuExternalLink />
        </HStack>
      </Link>
    </Box>
  );
};

export default ProjectCard;
