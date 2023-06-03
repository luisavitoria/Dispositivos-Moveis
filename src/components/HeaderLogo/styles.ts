import { StyleSheet, TextStyle, ViewStyle} from 'react-native'
import { THEME } from '../../theme'

type Style = {
    header: TextStyle;
    container: ViewStyle;
}

export const styles = StyleSheet.create<Style>({
    header: {
        color: THEME.COLORS.BLACK,
        fontSize: THEME.FONT_SIZE.LG,
        fontWeight: '700',
        marginBottom: 25
    },
    container: {
        flexDirection: "column",
        alignItems: 'center'
    }
})