import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from ".";
import "@testing-library/jest-dom/extend-expect";

test("renders search bar and calls onChange correctly", () => {
  const setSearchTerm = jest.fn();
  const onOpen = jest.fn();

  render(
    <SearchBar searchTerm="" setSearchTerm={setSearchTerm} onOpen={onOpen} />
  );

  // Check if the input is rendered with the correct placeholder text
  const input = screen.getByPlaceholderText("Find a project...");
  expect(input).toBeInTheDocument();

  // Simulate typing in the search input
  fireEvent.change(input, { target: { value: "new project" } });
  expect(setSearchTerm).toHaveBeenCalledWith("new project");

  // Check if the Add New Project button is rendered
  const button = screen.getByRole("button", { name: /new/i });
  fireEvent.click(button);
  expect(onOpen).toHaveBeenCalled();
});
