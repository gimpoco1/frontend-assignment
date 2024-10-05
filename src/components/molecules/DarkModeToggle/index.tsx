import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === "light" ? <FaMoon size={22} /> : <FaSun size={22} />}
      onClick={toggleColorMode}
      variant={""}
      position={"absolute"}
      top={4}
      right={4}
    />
  );
};

export default DarkModeToggle;
