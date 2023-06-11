
import React from 'react';
import { View, Text, Image } from 'react-native';
import { THEME } from '../../theme';
import logo from '../../../assets/images/logo.png'
import { styles } from './styles';


const HeaderLogo = () => {
    return (
        <View style={styles.container}>
            <Image style={{width: 100}} source={logo}></Image>

            <Text style={styles.header}>Cesmac Networking</Text>
        </View>
    )
}

export default HeaderLogo;