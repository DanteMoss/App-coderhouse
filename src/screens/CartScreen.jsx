import { 
  FlatList, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { 
  useDispatch, 
  useSelector 
} from "react-redux";
import { useState } from "react";

import { usePostOrderMutation } from "../services/shopService";

import { cleanCart } from "../features/cartSlice";
import { addOrder } from "../features/orderSlice";

import { COLORS } from "../const/colors";

import CartItem from "../components/Cartitem";
import ConfirmModal from "../components/ConfirmModal";

const CartScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const [modalVisible, setModalVisible] = useState(false)
  
  const cartItems = useSelector(state => state.cartReducer.value.items)
  const total = useSelector(state => state.cartReducer.value.total)
  const localId = useSelector(state => state.authReducer.localId)


  const [triggerPost, result ] = usePostOrderMutation()


  const confirmCart = () => {
    const date = Date.now()
    const order = { total, cartItems, localId: localId, createdAt: date, orderId: Math.ceil(Math.random(1,10)*1000) }
    dispatch(addOrder(order))
    triggerPost(order)
      .then((result) => {
        console.log('Order Result:', result);
        dispatch(cleanCart());
      })
      .catch((error) => {
        console.error('Error posting order:', error);
      });
    setModalVisible(true)
  }
  


  const onCleanCart = () => {
    dispatch(cleanCart())
  }
  

  const renderCartItem = ({ item }) => <CartItem item={item} />;

  return (
    <>
      {
        cartItems.length > 0
        ?
        <View style={styles.cartContainer}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.cartConfirm}>
            <Text style={styles.totalPrice}>Total: USD {total.toLocaleString('es-AR')}</Text>
            <TouchableOpacity style={styles.cleanButton} onPress={onCleanCart}>
              <Text style={styles.textConfirm}>Limpiar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmCart}>
              <Text style={styles.textConfirm}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Carrito Vacio</Text>
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
      <ConfirmModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        label="Compra realizada"
      />
      
    
    </>
    
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
  },
  cartConfirm: {
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  totalPrice: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold'
  },
  confirmButton:{
    backgroundColor: COLORS.secondary,
    padding: 8,
    borderRadius:10,
  },
  cleanButton: {
    backgroundColor: COLORS.third,
    padding: 8,
    borderRadius: 10
  },  
  textConfirm:{
    fontFamily:'Raleway-Bold',
    fontSize:16,
    color: '#fff'
  },
  emptyCartContainer: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
  },
  emptyCartText: {
    fontFamily: 'Raleway-Bold',
    color: COLORS.primary,
    fontSize: 24
  }  
})
