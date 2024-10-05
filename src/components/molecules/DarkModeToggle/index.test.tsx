import { render, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

import "@testing-library/jest-dom/extend-expect";
import DarkModeToggle from ".";

test("toggles dark mode", () => {
  const { getByRole } = render(
    <ChakraProvider>
      <DarkModeToggle />
    </ChakraProvider>
  );

  const button = getByRole("button", { name: /toggle dark mode/i });
  expect(button).toBeInTheDocument();

  // Simulate the button click to toggle the mode
  fireEvent.click(button);
  expect(button).toBeInTheDocument(); // Check if button is still rendered after toggle
});
