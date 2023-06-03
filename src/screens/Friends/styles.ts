import { StyleSheet } from 'react-native'
import { THEME } from '../../theme'
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,

        width: "100%",
        flex: 1
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: THEME.COLORS.PRIMARY,
    },
    text_heading: {
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXTPRIMARY,
        fontWeight: '700',
        marginLeft: 4
    },
    item: {
        borderBottomWidth: 1,
        borderColor: THEME.COLORS.BACKGROUNDBORDER,
        paddingBottom: 8,
        paddingTop: 5
    },
    heading_item:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    userNameText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.MD,
        marginLeft: 2,
    },
    userUserText: {
        color: THEME.COLORS.TEXTSECONDARY,
        fontSize: THEME.FONT_SIZE.SM,
        marginLeft: 5,
    },
    button_list: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: THEME.COLORS.SECONDARY,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderRadius: 8,
    }
    
})