import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from ".";
import "@testing-library/jest-dom/extend-expect";

test("renders empty state and triggers buttons", () => {
  const setSearchTerm = jest.fn();
  const onOpen = jest.fn();

  render(<EmptyState setSearchTerm={setSearchTerm} onOpen={onOpen} />);

  // Check if the heading text is rendered
  expect(screen.getByText(/no projects found/i)).toBeInTheDocument();

  // Check if the Clear Filters button is rendered and clickable
  const clearFiltersButton = screen.getByText(/clear filters/i);
  expect(clearFiltersButton).toBeInTheDocument();

  // Simulate clicking the Clear Filters button
  fireEvent.click(clearFiltersButton);
  expect(setSearchTerm).toHaveBeenCalledWith("");

  // Now match the "Add a new project" button using getByRole for more flexibility
  const addNewProjectButton = screen.getByRole("button", {
    name: /add a new project/i,
  });
  expect(addNewProjectButton).toBeInTheDocument();

  // Simulate clicking the Add New Project button
  fireEvent.click(addNewProjectButton);
  expect(onOpen).toHaveBeenCalled();
});
