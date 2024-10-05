import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";
import { messages } from "../messages";
const { emptyStateMessages } = messages;

const EmptyState = ({
  setSearchTerm,
  onOpen,
}: {
  setSearchTerm: (term: string) => void;
  onOpen: () => void;
}) => (
  <Box textAlign="center" py={20} px={6}>
    <Heading fontSize="title2" color="gray.400">
      {emptyStateMessages.noProjectsFound}
    </Heading>
    <Text fontSize="headline3" color="gray.400" mb={4}>
      {emptyStateMessages.noProjectsFound2}
    </Text>
    <HStack justifyContent="center">
      <Button
        onClick={() => setSearchTerm("")}
        colorScheme="teal"
        variant="ghost"
      >
        {emptyStateMessages.ctaClearFilters}
      </Button>
      <Button onClick={onOpen} colorScheme="teal" variant="solid">
        {emptyStateMessages.addNewProject}
      </Button>
    </HStack>
  </Box>
);

export default EmptyState;
