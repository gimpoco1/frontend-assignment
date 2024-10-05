import { render, fireEvent } from "@testing-library/react";
import SortMenu from ".";

import "@testing-library/jest-dom/extend-expect";
import SORT_OPTIONS from "../../../constants/sorting-options.constants";

test("renders sort menu and applies sort correctly", () => {
  const applySort = jest.fn();
  const currentSort = null;

  const { getByText } = render(
    <SortMenu currentSort={currentSort} applySort={applySort} />
  );

  // Check if sort button exists
  const sortButton = getByText(/sort/i);
  expect(sortButton).toBeInTheDocument();

  // Simulate button click
  fireEvent.click(sortButton);

  // Simulate clicking a sort option
  const sortOption = getByText(SORT_OPTIONS[0].label);
  fireEvent.click(sortOption);

  // Ensure the applySort function was called with the correct option
  expect(applySort).toHaveBeenCalledWith(SORT_OPTIONS[0]);
});
