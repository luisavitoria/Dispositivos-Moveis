import React, { useContext, useEffect } from 'react';
import { UserCircle } from 'phosphor-react-native'
import { View, Text, Image } from 'react-native';
import Button from '../../components/Button';
import { styles } from './styles';
import woman from '../../../assets/images/woman.jpg'

const Profile = () => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={woman} style={styles.profile_image} />
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
                <Button title='Sair' />
            </View>
        </View>
    )
}

export default Profile;