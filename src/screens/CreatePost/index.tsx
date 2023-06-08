
import React, { useState, useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { Context as PostContext } from '../../context/PostContext';
import profileImage from '../../../assets/images/profile.jpg'
import { Input } from '../../components/Input';
import { THEME } from '../../theme';

import Button from '../../components/Button';

import { styles } from './styles';

interface CreatePostProps {
    user: string | null;
    name: string | null;
    navigation: StackNavigationProp<any, any>;
}

const CreatePost = ({ user, name, navigation }: CreatePostProps) => {

    const { createPost } = useContext(PostContext)

    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState(null);
    const [photoShow, setPhotoShow] = useState('');
    let formData = new FormData();

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

        let type;
        if (filename) {
            let match = /\.(\w+)$/.exec(filename);
            type = match ? `image/${match[1]}` : `image`;
        }

        if (result.assets !== null) {
            if (filename && type && localUri) {
                setPhoto(JSON.parse(JSON.stringify({ uri: localUri, name: filename, type })))
            }
        }

    }

    if (photo) {
        formData.append('file', photo)
        formData.append('description', description)
    } else {
        formData.append('description', description)
    }

    return (
        <View style={styles.container} >
            <View style={styles.heading}>
                <Image source={profileImage} style={styles.profile_image} />
                <Text style={styles.userNameText}>{name}</Text>
                <Text style={styles.userUserText}>{`@${user}`}</Text>
            </View>

            <Text style={styles.title}> Novo Post </Text>

            <View style={{ marginHorizontal: 35}}>
                <Input.Container>
                    <Input.Input
                        value={description}
                        onChangeText={setDescription} placeholder='Digite a descrição do post...' placeholderTextColor={THEME.COLORS.INPUT}
                        autoCapitalize='none'
                        autoCorrect
                    />
                </Input.Container>
            </View>

            < TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={takePhotoAndUpload}
            >
                <Text style={styles.buttonTextStyle}> Adicionar imagem </Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
                {photoShow && <Image
                    source={{ uri: photoShow }}
                    style={styles.post_image}
                />
                }
            </View>


            <Button onPress={() => { 
                createPost && createPost(formData, navigation)
                navigation.navigate('HomeNavigator', {screen: 'Home'})
            }} title='Postar' />
           
        </View>
    )
}

export default CreatePost;
