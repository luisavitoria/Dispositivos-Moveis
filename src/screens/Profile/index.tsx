import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserCircle } from 'phosphor-react-native'
import { View, Text, Image } from 'react-native';
import Button from '../../components/Button';
import { styles } from './styles';
import profile from '../../../assets/images/profile.jpg'

interface ProfileProps {
    navigation: StackNavigationProp<any, any>;
}

const Profile = ({ navigation }: ProfileProps) => {

    const { userRegister, logout} = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={profile} style={styles.profile_image} />
                <Text style={styles.name}>Luísa Anjos</Text>
                <View style={styles.container_text}>
                    <View>
                        <Text style={styles.text_header}>CPF</Text>
                        <Text style={styles.text}>{`01122233344`}</Text>
                    </View>

                    <View>
                        <Text style={styles.text_header}>Matrícula</Text>
                        <Text style={styles.text}>{`123456`}</Text>
                    </View>

                    <View>
                        <Text style={styles.text_header}>E-mail</Text>
                        <Text style={styles.text}>{`luisa.anjos@cesmac.edu.br`}</Text>
                    </View>


                </View>
                <Button title='Sair' onPress={logout} />
            </View>
        </View>
    )
}

export default Profile;