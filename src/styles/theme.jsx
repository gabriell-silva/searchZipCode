import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fontSizes: {
        xs: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "1.75rem",
        xl: "2rem",
    },
    colors: {
        yellow: {
            300: "#d5ba94a6"
        },
        blue: {
            400: "#0071ad"
        }
    }
})