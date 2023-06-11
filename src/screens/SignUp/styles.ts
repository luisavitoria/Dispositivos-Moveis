import { StyleSheet, TextStyle, ViewStyle} from 'react-native'
import { THEME } from '../../theme'

type Style = {
    container: ViewStyle;
    containerPosition: ViewStyle;
    header: TextStyle;
    link: TextStyle;
    errorMessage: TextStyle;
}

export const styles = StyleSheet.create<Style>({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        color: THEME.COLORS.TEXTSECONDARY,
        marginTop: 20,
        
    }, 
    containerPosition: {
        alignItems: "center",
        marginTop: 50
    },
    header: {
        color: THEME.COLORS.BLACK,
        fontSize: THEME.FONT_SIZE.LG,
        fontWeight: '700',
        marginBottom: 20
    },
    link: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.SM,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 10
    },
    errorMessage: {
        color: THEME.COLORS.ERROR,
        textAlign: 'center'
    }
})