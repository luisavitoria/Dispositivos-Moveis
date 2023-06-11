import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image } from 'react-native';
import Button from '../../components/Button';
import { styles } from './styles';

interface ProfileProps {
    navigation: StackNavigationProp<any, any>;
}

const Profile = ({ navigation }: ProfileProps) => {

    const { userRegister, userName, profileImage, cpf, email, logout} = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={{ uri: profileImage}} style={styles.profile_image} />
                <Text style={styles.name}>{userName}</Text>
                <View style={styles.container_text}>
                    <View>
                        <Text style={styles.text_header}>CPF</Text>
                        <Text style={styles.text}>{cpf}</Text>
                    </View>

                    <View>
                        <Text style={styles.text_header}>Matrícula</Text>
                        <Text style={styles.text}>{userRegister}</Text>
                    </View>

                    <View>
                        <Text style={styles.text_header}>E-mail</Text>
                        <Text style={styles.text}>{email}</Text>
                    </View>


                </View>
                <Button title='Sair' onPress={logout} />
            </View>
        </View>
    )
}

export default Profile;