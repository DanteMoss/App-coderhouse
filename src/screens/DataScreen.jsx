import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Input from '../components/Input'
import { COLORS } from '../const/colors'
import { useState } from 'react'
import { useGetUserDataQuery, usePostUserDataMutation } from '../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../features/authSlice'


const DataScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const localId = useSelector(state => state.authReducer.localId)

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [direccion, setDireccion] = useState("")
  const [localidad, setLocalidad] = useState("")

  const [triggerPostData, result] = usePostUserDataMutation()

  const onSubmit =  () => {
    const newData = {
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      localidad: localidad
    }
    try {
      dispatch(setUserData(newData))
      triggerPostData({ localId, data: newData})
        .then((result) => {
          console.log("Datos: ", result)
        })
      navigation.navigate("Perfil")
    } catch (error) {
      console.log("Error al modificar datos: ", error)
    }
  }


  return (
    <View style={styles.container}>
      <Input 
        label="Nombre: "
        style={styles.input}
        onChange={setNombre}
      />
      <Input 
        label="Apellido: "
        style={styles.input}
        onChange={setApellido}

      />
      <Input 
        label="Direccion: "
        style={styles.input}
        onChange={setDireccion}

      />
      <Input 
        label="Localidad: "
        style={styles.input}
        onChange={setLocalidad}

      />
      <TouchableOpacity 
        style={styles.btn}
        onPress={onSubmit}
      >
        <Text style={styles.btnText}>Cargar Datos</Text>
      </TouchableOpacity>
    </View>
  )
}
export default DataScreen
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    flex: 1
  },
  input: {
    color: COLORS.error
  },
  btn: {
    padding: 14,
    backgroundColor: COLORS.third,
    borderRadius: 8,
    margin: 5,
    marginTop: 50
  },
  btnText: {
    color: COLORS.primary
  }

})