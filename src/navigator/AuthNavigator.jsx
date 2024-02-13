import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignUpScreen';
import Header from '../components/Header';

const AuthNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={
        ({ navigation, route }) => ({
          header: () => <Header title={route.name} navigation={navigation}/>
        })
      }
    >

      <Stack.Screen 
        name='Signup'
        component={SignupScreen}
      />

      <Stack.Screen 
        name='Login'
        component={LoginScreen}
      />
      
    </Stack.Navigator>

  )
}
export default AuthNavigator