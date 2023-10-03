import type { Config } from "tailwindcss";
import { teal } from "tailwindcss/colors";
const plugin = require("tailwindcss/plugin");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    plugin(function ({ addUtilities }: Config & { addUtilities: Function }) {
      const newUtilities = {
        ".flex-row-center": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        },
        ".flex-col-center": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        ".flex-row-between": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        ".flex-col-between": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        },
        ".flex-row-start": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        },
        ".flex-col-start": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        },
        ".flex-row-end": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        },
        ".flex-col-end": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        },
        ".flex-row-even": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        },
        ".flex-col-even": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        },
        ".flex-row-around": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        },
        ".flex-col-around": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: teal[50],
          100: teal[100],
          200: teal[200],
          300: teal[300],
          400: teal[400],
          500: teal[500],
          600: teal[600],
          700: teal[700],
          800: teal[800],
          900: teal[900],
        },
        secondary: {
          50: "#6B728E",
          100: "#50577A",
          200: "#474E68",
          300: "#404258",
        },
        tertiary: {
          50: "#635985",
          100: "#443C68",
          200: "#393053",
          300: "#18122B",
        },
        shade: {
          50: "#DDE6ED",
          100: "#9DB2BF",
          200: "#526D82",
          300: "#27374D",
        },
      },
    },
  },
};
export default config;
