import { extendTheme } from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
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
    Tag: {
      variants: {
        eventDetails: {
          border: "2px solid rgb(123, 123, 123)",
          borderRadius: "md",
          color: "red",
          px: 3,
          py: 2,
          boxSizing: "border-box",
        },
      },
    },
    Divider: {
      variants: {
        eventDetails: {
          maxWidth: "72px",
          height: "5px",
          background: "brand.primary",
          opacity: 1,
        },
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
        eventDescription: {
          fontWeight: 700,
          fontSize: "2xl",
          textAlign: "left",
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
