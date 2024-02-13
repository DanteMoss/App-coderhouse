import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../const/colors'

const Error = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error al cargar</Text>
      <View style={styles.errorButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() =>{navigation.navigate('Categorias')}}
        >
          <Text style={styles.errorText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Error
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  text: {
    fontFamily: 'Raleway-Bold',
    fontSize: 24,
    color: COLORS.secondary
  },
  errorButtonContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  errorText:{
    fontFamily:'Raleway-Bold',
    fontSize:16,
    color: '#fff'
  },
  backButton:{
    backgroundColor: COLORS.secondary,
    padding: 8,
    borderRadius:10,
  },

})