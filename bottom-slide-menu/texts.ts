import { StyleSheet } from "react-native";

// styles
import { colors } from "./colors";

export const textStyles = StyleSheet.create({
    h1_34: {
        fontSize: 34,
        lineHeight: 48,
        letterSpacing: 0.32,
        fontFamily: "OpenSans-Bold",
    },
    h2_26: {
        fontSize: 26,
        lineHeight: 36,
        fontFamily: "OpenSans-Bold",
    },
    h3_22: {
        fontSize: 22,
        lineHeight: 30,
        fontFamily: "OpenSans-SemiBold",
    },
    h4_18: {
        fontSize: 18,
        lineHeight: 25,
        fontFamily: "OpenSans-SemiBold",
    },
    h5_16: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: "OpenSans-SemiBold",
    },
    p1_18: {
        fontSize: 18,
        lineHeight: 25,
        fontFamily: "OpenSans-Regular",
    },
    p2_16: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: "OpenSans-Regular",
    },
    p3_14: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "OpenSans-Regular",
    },
    p4_12: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "OpenSans-Regular",
    },
    button_16: {
        fontSize: 16,
        lineHeight: 22,
        fontFamily: "OpenSans-SemiBold"
    },
    button_14: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "OpenSans-SemiBold"
    },
    button_12_semibold: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "OpenSans-SemiBold"
    },
    button_12: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "OpenSans-Bold"
    },
    toolbar: {
        fontSize: 10,
        lineHeight: 14,
        letterSpacing: 0.64
    },
    link: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.systemInfo,
        fontFamily: "OpenSans-Regular",
        textDecorationLine: "underline",
    }
}); 