import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Profile from './src/screens/Profile';
import Friends from './src/screens/Friends';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Login />
      {/* <SignUp /> */}
      {/* <Profile /> */}
      {/* <Friends /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
