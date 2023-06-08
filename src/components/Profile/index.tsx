
import { UserCircle, UsersFour } from 'phosphor-react-native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import userMan from '../../../assets/images/man.png'
import userWoman from '../../../assets/images/woman.png'

import { styles } from './styles';

interface ProfileItemProps {
    name: string;
    register: string;
    following: boolean;
    isMan: boolean;
}

const Profiles = ({ name, register, following, isMan }: ProfileItemProps) => {

    return (
        <View style={styles.item}>
            <View style={styles.heading_item}>

                {isMan && isMan === true ? 
                <Image source={userMan} style={styles.profile_image} />
                :
                <Image source={userWoman} style={styles.profile_image} />
            }
                <Text style={styles.userNameText}>{name}</Text>
                <Text style={styles.userUserText}>{`@${register}`}</Text>
            </View>

            {following && following === true ?

                <View style={styles.button_list}>
                    <TouchableOpacity style={styles.button}>
                        <Text>Seguir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button_disabled} disabled>
                        <Text>Deixar de seguir</Text>
                    </TouchableOpacity>
                </View>

                :

                <View style={styles.button_list}>
                    <TouchableOpacity style={styles.button_disabled} disabled>
                        <Text>Seguir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text>Deixar de seguir</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>

    )
}

export default Profiles;