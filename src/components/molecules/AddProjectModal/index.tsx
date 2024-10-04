import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  FormLabel,
  HStack,
} from "@chakra-ui/react";

import { v4 as uuidv4 } from "uuid";
import { Project } from "../../../data/types";
import { messages } from "./messages";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState<number>(1);

  const handleAdd = () => {
    const newProject: Project = {
      id: uuidv4(),
      name,
      url,
      rating,
      created_at: new Date().toISOString(),
    };
    onAdd(newProject);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={"18px"} p={4}>
        <ModalHeader fontSize={"headline3"}>{messages.addProject}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} mb="4">
            <FormLabel>
              {messages.formLabels.name}
              <Input
                placeholder={messages.formPlaceholders.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                borderRadius={"12px"}
                mt={2}
              />
            </FormLabel>
            <FormLabel>
              {messages.formLabels.url}
              <Input
                placeholder={messages.formPlaceholders.url}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                borderRadius={"12px"}
              />
            </FormLabel>
            <FormLabel>
              {messages.formLabels.rating}
              <Input
                placeholder={messages.formPlaceholders.rating}
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                borderRadius={"12px"}
              />
            </FormLabel>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="ghost" borderRadius={"12px"} onClick={onClose}>
              {messages.ctaCancel}
            </Button>
            <Button
              colorScheme="teal"
              borderRadius={"12px"}
              onClick={handleAdd}
            >
              {messages.ctaCreate}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectModal;
