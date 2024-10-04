import { extendTheme } from "@chakra-ui/react";
import { ITheme } from "./interface";

const theme = extendTheme({
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
    mono: `'Menlo, monospace'`,
  },
  fontSizes: {
    xlTitle1: "83px",
    title1: "52px",
    title2: "48px",
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
}) as ITheme;

export default theme;
