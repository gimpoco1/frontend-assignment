import { Theme } from "@chakra-ui/react";

export interface IFont {
  heading: string;
  body: string;
  mono: string;
}

export interface IFontSizes {
  xlTitle1: string;
  title1: string;
  title2: string;
  title3: string;
  headline: string;
  headline2: string;
  headline3: string;
  subheadline1: string;
  subheadline2: string;
  subheadline3: string;
  caption1: string;
  caption2: string;
  body: string;
  body2: string;
  footnote: string;
}

export interface ITheme extends Theme {
  fonts: IFont;
  fontSizes: IFontSizes & Theme["fontSizes"];
}
