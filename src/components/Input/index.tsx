
import React, { ReactNode} from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';

interface TextInputContainerProps {
    children: ReactNode;
}

const TextInputContainer = ({ children }: TextInputContainerProps) => {
    return ( 
        <View style={styles.container}>
            {children}
        </View>
    )
}

interface TextInputInputProps extends TextInputProps {}

const TextInputInput = (props: TextInputInputProps) => {
    return (
        <TextInput style={styles.input} {...props}></TextInput>
    )
}

interface TextInputIconProps {
    children: ReactNode;
}

const TextInputIcon = ({ children }: TextInputIconProps) => {
    return (
        <>
            {children}
        </>
    )
}

export const Input = {
    Container: TextInputContainer,
    Input: TextInputInput,
    Icon: TextInputIcon
}