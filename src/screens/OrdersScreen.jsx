import { 
  useEffect, 
  useState 
} from 'react'
import { 
  FlatList, Modal, StyleSheet, Text, TouchableOpacity, View 
} from 'react-native'

import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'

import { COLORS } from '../const/colors'

import OrderItem from '../components/OrderItem'
import OrderItemDetail from '../components/OrderItemDetail'
import Loader from '../components/Loader'
import Error from '../components/Error'




const OrdersScreen = ({ navigation }) => {

  const localId = useSelector(state => state.authReducer.localId)
  const localOrders = useSelector(state => state.orderReducer.orders)

  const { data, isLoading, error} = useGetOrdersQuery(localId)

  const [ orderData, setOrderData ] = useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [orderSelected, setOrderSelected] = useState({})

  
  useEffect(() => {
    if (data) {
      const orders = Object.values(data)
      setOrderData([...orderData, ...orders])
    }
  }, [data])

  useEffect(() => {
    if (localOrders) {
      setOrderData([...orderData, ...localOrders])
    }
  }, [localOrders])

  useEffect(() => {
    const orderSelected = orderData.find(order => order.orderId === orderId)
    setOrderSelected(orderSelected)
  }, [orderId])

  const renderOrderItem = ({ item }) => {
    return (
      <OrderItem order={item} setModalVisible={setModalVisible} setOrderId={setOrderId} />
    )
  }

  const renderItem = ({ item }) => {
    return (
      <OrderItemDetail item={item}/>
    )
  }


  if (isLoading) ( <Loader /> )
  if (error) ( <Error navigation={navigation} /> )



  
  return (
    <>
      {
        orderData.length > 0
        ?
        <>
          <FlatList
          data={orderData}
          renderItem={renderOrderItem}
          keyExtractor={orderData?.orderId}
          />
          <Modal visible={modalVisible} animationType='fade' transparent={true}>
            <View style={styles.modal}>
              <View style={styles.innerModal}>
                <FlatList 
                  data={orderSelected?.cartItems}
                  renderItem={renderItem}
                />
                <Text style={styles.modalText}>$ {orderSelected?.total.toLocaleString('es-AR')}</Text>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => {setModalVisible(false)}}
                >
                  <Text style={styles.btnText}>Volver</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
        :
        <View style={styles.emptyOrderContainer}>
          <Text style={styles.emptyOrderText}>No hay ordenes</Text>
          <View style={styles.cartConfirm}>
            <TouchableOpacity 
            style={styles.confirmButton} 
            onPress={() =>{navigation.navigate('Categorias')}}
            >
              <Text style={styles.textConfirm}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </>
  )
}
export default OrdersScreen

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  innerModal: {
    width: '90%',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Raleway-Bold",
    fontSize: 25,
  },
  modalBtn: {
    width: 100,
    padding: 12,
    borderRadius: 10,
    elevation: 20,
    backgroundColor: COLORS.third,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    color: COLORS.secondary
  },
  emptyOrderContainer: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
  },
  emptyOrderText: {
    fontFamily: 'Raleway-Bold',
    color: COLORS.primary,
    fontSize: 36
  },
  confirmButton:{
    backgroundColor: COLORS.secondary,
    padding:10,
    borderRadius:10,
  },
  textConfirm:{
    fontFamily:'Raleway-Bold',
    fontSize:16,
    color: '#fff'
  }
})