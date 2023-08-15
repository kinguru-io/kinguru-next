import { extendTheme } from "@chakra-ui/react";
import { StyleConfig } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  colors: {
    brand: {
      primary: "#ffd800",
      primaryActive: "#ffea00",
      secondary: "#2a2a2a",
    },
  },
  components: {
    Input: {
      variants: {
        invitation: {},
      },
    },
    Heading: {
      variants: {
        brand: {
          fontWeight: 400,
          fontSize: "4xl",
          textAlign: "center",
          color: ({ colorMode }) => ({
            color: colorMode === "light" ? "gray.100" : "gray.700",
          }),
        },
        invitation: {
          fontWeight: 400,
          fontSize: "4xl",
          textAlign: "center",
          color: "gray.100",
        },
      },
    },
    Button: {
      baseStyle: {
        bg: "transparent",
      },
      variants: {
        primary: {
          bg: "brand.primary",
          rounded: "full",
          fontSize: "md",
          fontWeight: "bold",
          textTransform: "uppercase",
          px: "10",
          py: "7",
          _hover: {
            bg: "brand.primaryActive",
          },
          _active: {
            boxShadow: "0 0 0 3px var(--chakra-colors-brand-primaryActive)",
          },
        },
        secondary: {
          px: "10",
          py: "7",
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          fontWeight: "black",
          _selected: {
            _after: {
              position: "absolute",
              content: '""',
              width: ["5rem", "9rem"],
              height: ["10px", "18px"],
              bg: "brand.primary",
              zIndex: -10,
              mt: ["18px", "26px"],
              mr: "38px",
            },
          },
        },
        tablist: {
          display: "flex",
          justifyContent: "space-around",
        },
        tabpanel: {
          display: ["block", "flex"],
          justifyContent: "space-around",
          alignItems: "center",
        },
      },
    },
  } as Record<string, StyleConfig>,
});
