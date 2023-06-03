
import React, { ReactNode } from 'react';
import { View, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity {...props} style={styles.touchable}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button;