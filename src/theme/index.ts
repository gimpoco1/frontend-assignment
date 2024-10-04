import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ITheme } from "./interface";

// Define the color mode configuration
const config: ThemeConfig = {
  initialColorMode: "light", // Set default to light mode, can be changed
  useSystemColorMode: false,  // Use system color mode preference if true
};

// Extend the theme
const theme = extendTheme({
  config,  // Add color mode configuration

  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
    mono: `'Menlo, monospace'`,
  },
  fontSizes: {
    xlTitle1: "83px",
    title1: "52px",
    title2: "44px",
    title3: "32px",
    headline: "30px",
    headline2: "27px",
    headline3: "24px",
    subheadline1: "22px",
    subheadline2: "20px",
    body: "18px",
    body2: "16px",
    footnote: "12px",
  },
  breakpoints: {
    base: '200px',
    xs: '314px',
    sm: '425px',
    md: '768px',
    lg: '1024px',
    xl: '1380px',
    xxl: '1900px',
  },

  // Customize global styles based on color mode
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",  // Background color based on mode
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",  // Text color based on mode
      },
    }),
  },
}) as ITheme;

export default theme;
