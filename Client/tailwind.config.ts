/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors, { black } from "tailwindcss/colors";

// base colors
const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

// color shades in light/dark mode
const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};

// generate themes for light and dark mode
const generateThemes = (colors: any, mapping: any, invert = false) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = invert ? value : key;
      theme[color][key] = colors[color]?.[shadeKey] ; // Fallback to black if shade doesn't exist
    });
  });
  return theme;
};

// generate themes
const lightThemes = generateThemes(colors, shadeMapping);
const darkThemes = generateThemes(colors, shadeMapping, true);


// themes
const themes = {
  light: {
    ...lightThemes,
    white: "#ffffff"
  },
  dark: {
    ...darkThemes,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
}

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [createThemes(themes)],
} satisfies Config;
