import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { messages } from "./messages";
import { ChakraProvider } from "@chakra-ui/react";
import AddProjectModal from ".";

jest.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

describe("AddProjectModal", () => {
  const mockOnAdd = jest.fn();
  const mockOnClose = jest.fn();

  const renderWithChakra = (component: React.ReactNode) => {
    return render(<ChakraProvider>{component}</ChakraProvider>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders modal correctly when opened", () => {
    renderWithChakra(
      <AddProjectModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    // Check if modal content is rendered
    expect(screen.getByText(messages.addProject)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(messages.formPlaceholders.name)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(messages.formPlaceholders.url)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(messages.formPlaceholders.rating)
    ).toBeInTheDocument();
  });

  test("ensures the modal renders correctly", () => {
    renderWithChakra(
      <AddProjectModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    screen.debug();

    // Verify that the modal is actually rendered
    expect(screen.getByText(messages.addProject)).toBeInTheDocument();
  });

  test("calls onAdd with correct data when the form is valid", () => {
    renderWithChakra(
      <AddProjectModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );
    // Fill out the form with valid data
    fireEvent.change(
      screen.getByPlaceholderText(messages.formPlaceholders.name),
      { target: { value: "Test Project" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(messages.formPlaceholders.url),
      { target: { value: "https://github.com/testproject" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(messages.formPlaceholders.rating),
      { target: { value: "5" } }
    );

    const createButton = screen.getByText(messages.ctaCreate);
    fireEvent.click(createButton);

    // Check if onAdd was called with the correct project data
    expect(mockOnAdd).toHaveBeenCalledWith({
      id: "mock-uuid",
      name: "Test Project",
      url: "https://github.com/testproject",
      rating: 5,
      created_at: expect.any(String),
    });

    // Ensure the modal is closed after successful creation
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("closes modal when the cancel button is clicked", () => {
    renderWithChakra(
      <AddProjectModal isOpen={true} onClose={mockOnClose} onAdd={mockOnAdd} />
    );

    // Simulate clicking the cancel button
    const cancelButton = screen.getByText(messages.ctaCancel);
    fireEvent.click(cancelButton);

    // Check if the onClose handler was called
    expect(mockOnClose).toHaveBeenCalled();
  });
});
