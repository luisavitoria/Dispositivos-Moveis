
import React, { useContext, useState, useEffect } from 'react';
import { UserCircle, Heart, ChatCentered } from 'phosphor-react-native'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Post } from '../../@types/post';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack'
import { Context as AuthContext } from '../../context/AuthContext';

interface PostItemProps {
    post: Post;
    screenName?: string;
    navigation?: StackNavigationProp<any, any>;
}

const PostItem = ({ post, screenName, navigation }: PostItemProps) => {

    const { userRegister, tryLocalLogin } = useContext(AuthContext)

    useEffect(() => {
        tryLocalLogin && tryLocalLogin()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                {post.profileImage ? <Image source={{ uri: post.pathProfileImage}} style={styles.profile_image} /> : <UserCircle size={48} weight='thin' />}

                <Text style={styles.userNameText}>{post.name}</Text>
                <Text style={styles.userUserText}>{`@${post.register}`}</Text>
            </View>


            {screenName && navigation ?
                <TouchableOpacity onPress={() => navigation.navigate(screenName, { postId: post.id })}>
                    <View style={styles.content}>
                        {post.description && <Text style={styles.post_description}>{post.description}</Text>}
                        {post.image && (
                            <Image source={{ uri: post.pathImage}} style={styles.post_image} />
                        )}
                    </View>
                </TouchableOpacity>
                :
                <View style={styles.content}>
                    {post.description && <Text style={styles.post_description}>{post.description}</Text>}
                    {post.image && (
                        <Image source={{ uri: post.pathImage}} style={styles.post_image} />
                    )}
                </View>
            }

            <View style={styles.footer}>
                <View style={styles.footer_item}>
                    <TouchableOpacity>
                        {post.likes && userRegister && post.likes.includes(userRegister) ?
                            <Heart size={28} color='#81d4fa' weight='fill' />
                            :
                            <Heart size={28} />
                        }
                    </TouchableOpacity>

                    {post.likes && (
                        <Text>{post.likes.length}</Text>
                    )}
                </View>
            </View>
        </View>
    )
}

export default PostItem;