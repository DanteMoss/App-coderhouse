import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StyleSheet } from "react-native";

import Header from "../components/Header";
import ProfileScreen from "../screens/ProfileScreen";
import ImageSelectorScreen from "../screens/ImageSelectorScreen";
import DataScreen from "../screens/DataScreen";


const ProfileNavigator = () => {

  const Stack = createNativeStackNavigator();

  return (
  
    <Stack.Navigator
      initialRouteName="Perfil"
      screenOptions={
        ({ navigation, route}) => ({
          header: () => <Header title={route.name} navigation={navigation} />
        })
      }
    >

      <Stack.Screen 
        name="Perfil"
        component={ProfileScreen}
      />

      <Stack.Screen 
        name="Seleccionar Imagen"
        component={ImageSelectorScreen}
      />

      <Stack.Screen 
        name="Cargar Datos"
        component={DataScreen}
      />


    </Stack.Navigator>
  
    )

}


export default ProfileNavigator

const styles = StyleSheet.create({})