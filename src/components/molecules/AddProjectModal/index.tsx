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
  Text,
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
  const [rating, setRating] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleAdd = () => {
    const ratingNumber = Number(rating);
    const githubUrlPattern = /^https:\/\/github\.com\/.+/;
    if (!name || !url || !rating) {
      setError("All fields are required");
      return;
    }
    if (!githubUrlPattern.test(url)) {
      setError("URL must be a valid GitHub URL");
      return;
    }
    if (ratingNumber < 1 || ratingNumber > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    const newProject: Project = {
      id: uuidv4(),
      name,
      url,
      rating: ratingNumber,
      created_at: new Date().toISOString(),
    };
    onAdd(newProject);
    handleClose();
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) >= 1 && Number(value) <= 5) {
      setError("");
    }
    setRating(value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const githubUrlPattern = /^https:\/\/github\.com\/.+/;
    if (githubUrlPattern.test(value)) {
      setError("");
    }
    setUrl(value);
  };

  const handleClose = () => {
    setName("");
    setUrl("");
    setRating("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={"xl"} isCentered>
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
                onChange={handleUrlChange}
                borderRadius={"12px"}
              />
            </FormLabel>
            <FormLabel>
              {messages.formLabels.rating}
              <Input
                placeholder={messages.formPlaceholders.rating}
                type="number"
                value={rating}
                onChange={handleRatingChange}
                borderRadius={"12px"}
                min={1}
                max={5}
                errorBorderColor="red.500"
              />
              {error && (
                <Text color="red.500" mt={2} fontSize="sm">
                  {error}
                </Text>
              )}
            </FormLabel>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="ghost" borderRadius={"12px"} onClick={handleClose}>
              {messages.ctaCancel}
            </Button>
            <Button
              colorScheme="teal"
              borderRadius={"12px"}
              onClick={handleAdd}
              isDisabled={!name || !url || !rating || error !== ""}
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