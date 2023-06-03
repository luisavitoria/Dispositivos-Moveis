import { UsersFour } from 'phosphor-react-native';
import React from 'react';
import { View, Text, ScrollView, } from 'react-native';
import Profile from '../../components/Profile';

import { styles } from './styles';

const Friends = () => {

  return (
    <View style={styles.container}>

      <View style={styles.heading}>
        <UsersFour size={48} weight='thin' color='white' />
        <Text style={styles.text_heading}>Amigos</Text>
      </View>

      <ScrollView>
        <Profile name='João Silva' register='142536' following={true} isMan={true} />

        <Profile name='Maria Clara Santos' register='432156' following={false} isMan={false} />

        <Profile name='Pedro Henrique Silva' register='896858' following={false} isMan={true} />

        <Profile name='Luana Carvalho' register='369574' following={true} isMan={false} />

      </ScrollView>

    </View>
  )
}

export default Friends;