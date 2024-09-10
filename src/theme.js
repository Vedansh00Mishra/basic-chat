// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      // Primary colors
      beige: "#F5F5DC",
      brown: "#A0522D",
      white: "#FFFFFF",
      grey: "#D3D3D3",
      gold: "#FFD700",
      darkGrey: "#696969",
    },
  },
  components: {
    // Customize default Chakra UI components here if needed
    Button: {
      baseStyle: {
        borderRadius: "md", // Adjust button border radius
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Arial, sans-serif", // Adjust font family for headings
      },
    },
    // Add custom styles for other components here
  },
});

export default theme;
