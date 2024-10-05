import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { ITheme } from "./interface";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
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
    base: "200px",
    xs: "314px",
    sm: "425px",
    md: "768px",
    lg: "1024px",
    xl: "1380px",
    xxl: "1900px",
  },

  styles: {
    global: (props: {
      colorMode: string;
      theme: { colors: { [x: string]: string } };
    }) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
        transition: "background-color 0.3s ease, color 0.3s ease",
      },
    }),
  },
}) as ITheme;

export default theme;
