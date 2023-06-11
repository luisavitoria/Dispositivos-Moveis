import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.PRIMARY,
        padding: 15,
        paddingBottom: 20,
        borderRadius: 25
    },
    profile_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    name: {
        fontSize: THEME.FONT_SIZE.LG,
        fontWeight: '700',
        color: THEME.COLORS.TEXTPRIMARY,
        marginBottom: 20,
    },
    container_text: {
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    text_header: {
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXTPRIMARY,
        fontWeight: '700'
    },
    text: {
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXTPRIMARY,
        marginBottom: 5,
        marginLeft: 8
    },
    buttonStyle: {
        backgroundColor: THEME.COLORS.PRIMARYDARK,
        color: THEME.COLORS.TEXTPRIMARY,
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginVertical: 15,
        paddingHorizontal: 10
    },
    buttonTextStyle: {
        color: THEME.COLORS.TEXTPRIMARY,
        paddingVertical: 10,
        fontSize: 16,
    },
})