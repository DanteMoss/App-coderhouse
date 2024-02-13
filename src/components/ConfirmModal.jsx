import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../const/colors'
const ConfirmModal = ({ modalVisible, setModalVisible, navigation, label }) => {
  return (
    <Modal visible={modalVisible} animationType='slide' transparent={true}>
      <View style={styles.modal}>
        <View style={styles.innerModal}>
          <Text style={styles.modalText}>{label}</Text>
          <TouchableOpacity 
            style={styles.modalBtn}
            onPress={() => { 
              setModalVisible(false) 
              navigation.navigate('Categorias')
            }}
          >
            <Text style={styles.btnText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default ConfirmModal
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
  },
  innerModal: {
    backgroundColor: COLORS.secondary,
    width: '75%',
    height: '30%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36
  },
  modalText: {
    color: COLORS.white,
    fontFamily: 'Raleway-Bold',
    fontSize: 26

  },
  modalBtn: {
    backgroundColor: COLORS.third,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
})