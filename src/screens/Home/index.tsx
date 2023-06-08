
import React from 'react';
import { styles } from './styles';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { NotePencil } from 'phosphor-react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import Feed from '../../components/Feed';
import profileImage from '../../../assets/images/profile.jpg'

interface HomeProps {
  navigation: StackNavigationProp<any, any>;
  user: string | null;
  name: string | null;
  screenName: string;
}

const Home = ({navigation, user, name, screenName}: HomeProps) => {
  
  function handlePencilPress() {
    navigation.navigate("CreatePost")
  }

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Image source={profileImage} style={styles.profile_image} /> 

        <Text style={styles.userNameText}>{name}</Text>

        {user && <Text style={styles.userUserText}>{`@${user}`}</Text> }

        <View style={{flex: 1}}></View>

        <TouchableOpacity onPress={handlePencilPress}>
          <NotePencil color='white' weight='thin' size={40} />
        </TouchableOpacity>
        
      </View>

      <View style={styles.content}>
        <Feed screenName={screenName} navigation={navigation} />
      </View>
      
    </View>
  )
}

export default Home;