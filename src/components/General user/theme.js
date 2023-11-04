import {createContext, useState, useMemo} from 'react';
import {createTheme} from "@mui/material/styles"

let theme = createTheme({
  palette: {
    primary: {
        100: "#cccccc",
        200: "#999999",
        300: "#666666",
        400: "#333333",
        500: "#000000",
        600: "#000000",
        700: "#000000",
        800: "#000000",
        900: "#000000"
    },
    white: {
        100: "#ffffff",
        200: "#ffffff",
        300: "#ffffff",
        400: "#ffffff",
        500: "#ffffff",
        600: "#cccccc",
        700: "#999999",
        800: "#666666",
        900: "#333333"
    },
    red: {
        100: "#ffcccc",
        200: "#ff9999",
        300: "#ff6666",
        400: "#ff3333",
        500: "#ff0000",
        600: "#cc0000",
        700: "#990000",
        800: "#660000",
        900: "#330000"
    },
    buttonBlue: {
        100: "#ccecfa",
        200: "#99d9f4",
        300: "#66c5ef",
        400: "#33b2e9",
        500: "#009fe4",
        600: "#007fb6",
        700: "#005f89",
        800: "#00405b",
        900: "#00202e"
    },
  },
  typography: {
    fontFamily: [
        '"Inter", sans-serif'
    ].join(','),
  },
});

export default theme;
