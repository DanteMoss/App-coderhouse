import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {


  return (
    <Stack.Navigator
      initialRouteName='Order'
      screenOptions={({ navigation, route }) => ({
        header: () => <Header title={route.name} navigation={navigation}/>
      })}
    >
      <Stack.Screen 
        name='Order'
        component={OrdersScreen}
      />

    </Stack.Navigator>
  )
  
}
export default OrderNavigator