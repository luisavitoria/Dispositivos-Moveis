import { UsersFour } from 'phosphor-react-native';
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import Profile from '../../components/Profile';
import { Context as AuthContext } from '../../context/AuthContext';
import { getFirestore, getDocs, collection, query } from '@firebase/firestore';

import { styles } from './styles';

const Friends = () => {
  const [friends, setFriends] = useState<any[]>([])
  const { userRegister } = useContext(AuthContext)

  const getFriends = async () => {
    const db = getFirestore()
    let friends: any[] = []

    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const d = { ...doc.data(), id: doc.id }
      if (doc.data().register !== userRegister) {
        friends.push(doc.data())
      }
    });

    setFriends(friends)
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.heading}>
        <UsersFour size={48} weight='thin' color='white' />
        <Text style={styles.text_heading}>Amigos</Text>
      </View>

      <ScrollView horizontal={true}>
        {friends.length > 0 && (
          <FlatList
            data={friends}
            renderItem={({ item }) => <Profile name={item.name} register={item.register} profileImage={item.profileImage} />}
          />
        )}
      </ScrollView>

    </View>
  )
}

export default Friends;