
import React, { useContext } from 'react';
import { styles } from './styles';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as PostContext } from '../../context/PostContext';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NotePencil, ArrowsClockwise } from 'phosphor-react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Feed from '../../components/Feed';

interface HomeProps {
  navigation: StackNavigationProp<any, any>;
  user: string | null;
  name: string | null;
  screenName: string;
}

const Home = ({ navigation, user, name, screenName }: HomeProps) => {
  const { userRegister, profileImage, tryLocalLogin } = useContext(AuthContext)
  const { getPosts } = useContext(PostContext)
  function handlePencilPress() {
    navigation.navigate("CreatePost")
  }

  function handleRefresh() {
    getPosts && getPosts()
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {profileImage && <Image source={{ uri: profileImage }} style={styles.profile_image} />}

        <Text style={styles.userNameText}>{name}</Text>

        {user && <Text style={styles.userUserText}>{`@${user}`}</Text>}

        <View style={{ flex: 1 }}></View>

        <TouchableOpacity onPress={handlePencilPress} style={{ marginRight: 4}}>
          <NotePencil color='white' weight='thin' size={40} />
        </TouchableOpacity>


        <TouchableOpacity onPress={handleRefresh}>
          <ArrowsClockwise color='white' weight='thin' size={32} />
        </TouchableOpacity>

      </View>

      <View style={styles.content}>
        <Feed screenName={screenName} navigation={navigation} />
      </View>

    </View>
  )
}

export default Home;