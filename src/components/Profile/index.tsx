
import { UserCircle, UsersFour } from 'phosphor-react-native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { styles } from './styles';

interface ProfileItemProps {
    name: string;
    register: string;
    profileImage: string;
}

const Profiles = ({ name, register, profileImage }: ProfileItemProps) => {

    return (
        <View style={styles.item}>
            <View style={styles.heading_item}>

                {profileImage ?
                    <Image source={{ uri: profileImage }} style={styles.profile_image} />
                    :
                    <UserCircle size={50} weight='thin' />
                }
                <Text style={styles.userNameText}>{name}</Text>
                <Text style={styles.userUserText}>{`@${register}`}</Text>
            </View>

            <View style={styles.button_list}>
                <TouchableOpacity style={styles.button_disabled}>
                    <Text>Seguir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} disabled>
                    <Text>Deixar de seguir</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default Profiles;