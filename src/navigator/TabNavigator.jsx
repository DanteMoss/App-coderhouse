import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import { COLORS } from '../const/colors.js';

import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrderNavigator from './OrderNavigator.jsx';

import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons';
import ProfileNavigator from './ProfileNavigator.jsx';

const TabNavigator = () => {

  const Tab = createBottomTabNavigator();


  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen 
          name='Shop'
          component={ShopNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome name="shopping-basket" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            )
          }}
        />
        <Tab.Screen 
          name='Cart'
          component={CartNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <Entypo name="shopping-cart" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            )
          }}
        />
        <Tab.Screen
          name='Orders'
          component={OrderNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome5 name="clipboard-list" size={24} color={focused ? COLORS.primary : COLORS.gray} />
            )
          }}
        />
        <Tab.Screen
          name='ProfileStack'
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome5 
                name="user" 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray} 
              />
            )
          }}
        />
      </Tab.Navigator>

  )
}


export default TabNavigator

const styles = StyleSheet.create({})