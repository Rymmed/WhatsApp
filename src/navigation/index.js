import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screens/ChatScreen';
import ChatsScreen from '../screens/ChatsScreen';
import MainTabNavigator from './MainTabNavigator';
import ContactsScreen from '../screens/ContactsScreen';
import Authentification from '../screens/Authentification';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'whitesmoke' } }}>
        <Stack.Screen name='auth' component={Authentification}/>
        <Stack.Screen name='newuser' component={SignUp}/>
          <Stack.Screen name='Home' component={MainTabNavigator} options={{headerShown: false}} />
          <Stack.Screen name='Chat' component={ChatScreen} />
          <Stack.Screen name='Contacts' component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator