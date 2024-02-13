import { useState } from 'react'
import { MaterialIcons} from '@expo/vector-icons'
import { 
  Image, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

import { COLORS } from '../const/colors'
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePicture } from '../features/authSlice';
import { usePostProfilePictureMutation } from '../services/userService';



const ImageSelectorScreen = ({ navigation }) => {

  const localId = useSelector(state => state.authReducer.localId)
  const [image, setImage] = useState("")
  const dispatch = useDispatch();

  const [triggerPostProfilePicture, result] = usePostProfilePictureMutation()

  const verifyCameraPermision = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    return granted ? true : false
  }
  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermision();
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1,1],
        base64: true,
        quality: 0.2
      })
      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
        
      }
    }
    else {
      console.log("No se han otorgado los permisos de camara")
    }
  }
  const confirmImage = () => {
    dispatch(setProfilePicture(image))
    triggerPostProfilePicture({localId, image})
    navigation.goBack()
  }




  return (
    <View style={styles.container}>
      {
        image 
        ? 
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: image }}
            style={styles.image}
            resizeMode='cover'
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={pickImage}>
              <Text style={styles.textBtn}>Tomar Otra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.btn, ...styles.btnConfirm }} onPress={confirmImage}>
              <Text style={styles.textBtn}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.noImageContainer}>
          <MaterialIcons 
            name='no-photography' 
            size={200} 
            color='#ccc' 
          />
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={styles.textBtn}>Abrir Camara</Text>
          </TouchableOpacity>
        </View>
      }  
    </View>
  )
}

export default ImageSelectorScreen

const styles = StyleSheet.create({
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 50
  },
  textBtn: {
    color: "#FFF"
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10
  },
  btnConfirm: {
    backgroundColor: COLORS.confirm,
    paddingHorizontal: 50
  }
})