import React, { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Context as AuthContext } from '../../context/AuthContext';
import { UserCircle } from 'phosphor-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import { styles } from './styles';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateDoc, Timestamp, addDoc, getDoc, doc, getFirestore, getDocs, collection, query } from '@firebase/firestore';

interface ProfileProps {
    navigation: StackNavigationProp<any, any>;
}

const Profile = ({ navigation }: ProfileProps) => {

    const { userRegister, userName, profileImage, cpf, email, logout } = useContext(AuthContext)
    const [photoName, setPhotoName] = useState('');
    const [photoShow, setPhotoShow] = useState('');

    const takePhotoAndUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        setPhotoShow(localUri);
        let filename = localUri.split('/').pop();


        if (filename) {
            setPhotoName(filename)
        }
        let pathImage;
        if (localUri) {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', localUri, true);
                xhr.send(null);
            })
            const fileRef = ref(getStorage(), filename);
            const result = await uploadBytes(fileRef, blob);

            pathImage = await getDownloadURL(fileRef);
        }

        const auth = getAuth();
        await onAuthStateChanged(auth, async (user) => {
            if (user != null) {
                const db = getFirestore()

                try {
                    await updateDoc(doc(db, 'users', user.uid), {
                        profileImage: pathImage
                    })

                    alert('Imagem alterada com sucesso!')

                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ alignItems: 'center' }}>
                    {photoShow ? <Image
                        source={{ uri: photoShow }}
                        style={styles.profile_image}
                    /> :
                        <Image source={{ uri: profileImage }} style={styles.profile_image} />
                    }
                </View>


                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={takePhotoAndUpload}
                >
                    <Text style={styles.buttonTextStyle}> Alterar foto de perfil </Text>
                </TouchableOpacity>
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