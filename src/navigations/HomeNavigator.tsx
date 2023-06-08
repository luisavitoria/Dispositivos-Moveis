
import React, { useEffect, useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Context as AuthContext } from '../context/AuthContext'
import Home from '../screens/Home';
import PostDetails from '../screens/PostDetails';

const Stack = createStackNavigator()

const HomeNavigator = () => {
  const { userRegister, userName, tryLocalLogin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalLogin && tryLocalLogin()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" children={(props) => <Home user={userRegister} name={userName} screenName="PostDetail" {...props} />} />
      <Stack.Screen name='PostDetail' component={PostDetails} initialParams={{ postId: '' }} />

    </Stack.Navigator>
  )
}

export default HomeNavigator;