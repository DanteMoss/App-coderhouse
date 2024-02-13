import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesome } from '@expo/vector-icons';

import { COLORS } from '../const/colors.js'
import { useGetUserDataQuery } from '../services/userService.js';
import { useEffect, useState } from 'react';
import { setUserData } from '../features/authSlice.js';

import Loader from '../components/Loader.jsx'
import Error from '../components/Error.jsx'



const ProfileScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  
  const image = useSelector(state => state.authReducer.profilePicture)
  const localId = useSelector(state => state.authReducer.localId)
  const userData = useSelector(state => state.authReducer.userData)
  
  const {data, isLoading, error} = useGetUserDataQuery(localId)

  const [datosUsuario, setDatosUsuario] = useState(data)

  useEffect(() => {
    if (userData) {
      setDatosUsuario(userData)
    }
  }, [userData])

  if (isLoading) (<Loader />)
  if (error) (<Error navigation={navigation} />)

  

  const renderImage = () => (
    <Pressable 
      onPress={() => navigation.navigate('Seleccionar Imagen')}
      style={styles.imageContainer}
    >
      {
        image 
        ? 
        <Image  source={{ uri: image }} style={styles.profilePicture} resizeMode='contain'/>
        : 
        <Image  source={require('../../assets/img/usuario.png')} style={styles.profilePicture} resizeMode='contain'/>
      }
    </Pressable>
  )

  const renderUserData = () => (
    <View style={styles.userDataContainer}>
      <Text style={styles.userTitle}>{datosUsuario?.nombre || data?.nombre} {datosUsuario?.apellido || data?.apellido}</Text>
      <Text style={styles.userData}>Nivel: 12</Text>
      <Text style={styles.userData}>Direccion: {datosUsuario?.direccion || data?.direccion}</Text>
      <Text style={styles.userData}>Localidad: {datosUsuario?.localidad || data?.localidad}</Text>
    </View>
  )
  
  return (
    <View style={styles.container}>
      <View>{renderImage()}</View>
      {renderUserData()}
      <View style={styles.pencil}>
        <Pressable
          onPress={() => navigation.navigate("Cargar Datos")}
        >
          <FontAwesome name="pencil-square-o" size={28} color={COLORS.primary} />
        </Pressable>
      </View>
    </View>
  )
}


export default ProfileScreen


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    gap: 20,
    alignItems: 'flex-start',
    justifyContent: "space-around"
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  userDataContainer: {
    marginTop: 10
  },
  userTitle: {
    fontSize: 16
  },
  imageContainer: {
    borderRadius: 100
  },
  userData: {
    fontSize: 12
  }, 
  pencil: {
    
  }

})