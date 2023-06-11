import { useContext } from 'react'
import { MainNavigator } from './src/navigations';
import { NavigationContainer, createNavigationContainerRef, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initializeApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './src/config/firebase-config';
import { THEME } from './src/theme';
import { HouseSimple, UsersThree, User } from 'phosphor-react-native';

import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'
import { Provider as PostProvider, Context as PostContext, } from './src/context/PostContext'

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Friends from './src/screens/Friends';
import Profile from './src/screens/Profile';
import { useEffect } from 'react';

const navigationRef = createNavigationContainerRef()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: THEME.COLORS.TEXTPRIMARY,
  },
}

function App() {
  const app = initializeApp(firebaseConfig)
  
  const { token, userName, tryLocalLogin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalLogin && tryLocalLogin()
  }, [])

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        {!token ?
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
          :
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                switch (route.name) {
                  case 'MainNavigator':
                    return (
                      <HouseSimple weight='fill' size={size} color={color} />
                    )
                  case 'Friends':
                    return (
                      <UsersThree weight='fill' size={size} color={color} />
                    )
                  case 'Profile':
                    return (
                      <User weight='fill' size={size} color={color} />
                    )
                }
              },
              headerShown: false,
              tabBarShowLabel: false,
              tabBarInactiveTintColor: THEME.COLORS.BLACK,
              tabBarActiveTintColor: THEME.COLORS.SECONDARY,
            })}
          >
            <Tab.Screen name="MainNavigator" component={MainNavigator} options={{
              unmountOnBlur: true,
            }} />
            <Tab.Screen name="Friends" component={Friends} options={{
              unmountOnBlur: true,
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
              unmountOnBlur: true,
            }} />
          </Tab.Navigator>
        }

      </NavigationContainer>

    </SafeAreaProvider>
  );
};

export default () => {
  return (
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  )
}