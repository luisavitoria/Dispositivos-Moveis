import { StyleSheet } from "react-native"
import { THEME } from "../../theme"

export const styles = StyleSheet.create({
    touchable: {
        minWidth: 280,
        padding: 14,
        backgroundColor: THEME.COLORS.SECONDARY,
        alignItems: 'center',
        borderRadius: 12,
        marginVertical: 15
    },
    text: {
        color: THEME.COLORS.TEXTSECONDARY,
        textAlign: 'center'
    }
})