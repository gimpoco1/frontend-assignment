import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ChakraProvider } from "@chakra-ui/react";
import { Project } from "../../../data/types";
import ProjectCard from ".";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  window.getComputedStyle = jest.fn().mockReturnValue({
    getPropertyValue: jest.fn(),
  });
});

jest.mock("@chakra-ui/react", () => {
  const actualChakra = jest.requireActual("@chakra-ui/react");
  return {
    ...actualChakra,
    useDisclosure: jest.fn().mockReturnValue({
      isOpen: true,
      onToggle: jest.fn(),
      onClose: jest.fn(),
    }),
    useColorModeValue: jest.fn().mockReturnValue("white"),
  };
});

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

const mockProject: Project = {
  id: "1",
  name: "Test Project",
  rating: 4,
  url: "https://github.com/testproject",
  created_at: "2023-11-19T13:46:36.211Z",
};

describe("ProjectCard Component", () => {
  const mockOnRemove = jest.fn();

  const renderWithChakra = (component: React.ReactNode) => {
    return render(<ChakraProvider>{component}</ChakraProvider>);
  };

  test("renders ProjectCard with correct content", () => {
    renderWithChakra(
      <ProjectCard project={mockProject} onRemove={mockOnRemove} />
    );

    // Check if the project name is rendered
    expect(screen.getByText("Test Project")).toBeInTheDocument();

    // Check if the correct number of stars are rendered
    expect(screen.getAllByTestId("star-icon").length).toBe(mockProject.rating);

    // Check if the external link is rendered with correct href
    expect(screen.getByText("View on GitHub").closest("a")).toHaveAttribute(
      "href",
      mockProject.url
    );
  });

  test("shows remove button on hover and calls onRemove when clicked", () => {
    renderWithChakra(
      <ProjectCard project={mockProject} onRemove={mockOnRemove} />
    );

    // Simulate hover
    const card = screen
      .getByRole("heading", { name: /test project/i })
      .closest("div");

    // Ensure `card` is not null before simulating hover
    if (card) {
      fireEvent.mouseEnter(card);

      // Check if remove button appears on hover
      const removeButton = screen.getByRole("button", {
        name: /remove project/i,
      });
      expect(removeButton).toBeInTheDocument();

      // Click the remove button and check if the function is called
      fireEvent.click(removeButton);
      expect(mockOnRemove).toHaveBeenCalledWith(mockProject.id);
    } else {
      throw new Error("Card element not found");
    }
  });

  test("background color changes when color circle is clicked", () => {
    renderWithChakra(
      <ProjectCard project={mockProject} onRemove={mockOnRemove} />
    );

    const colorOption = screen.getByTestId("color-picker-1");
    fireEvent.click(colorOption);

    // Check if localStorage is updated with the new color
    const bgColor = localStorage.getItem(`bgColor-${mockProject.id}`);
    expect(bgColor).not.toBeNull(); // Ensure the color has been set in localStorage
  });
});
