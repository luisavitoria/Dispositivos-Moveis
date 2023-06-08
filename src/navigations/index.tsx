import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Context as AuthContext } from '../context/AuthContext'
import HomeNavigator from './HomeNavigator';
import CreatePost from '../screens/CreatePost';

const Stack = createStackNavigator();

export const MainNavigator = () => {
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
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            <Stack.Screen name="CreatePost" children={(props) => <CreatePost user={userRegister} name={userName} {...props} />} /> 

        </Stack.Navigator>
    )

}

