import { 
  useEffect, 
  useState 
} from 'react'
import { 
  ActivityIndicator, 
  Image, 
  Modal, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native'
import { 
  useDispatch, 
  useSelector 
} from 'react-redux'

import { COLORS } from '../const/colors.js'
import { addItem } from '../features/cartSlice.js'
import { useGetProductByIdQuery } from '../services/shopService.js'

import { AntDesign } from '@expo/vector-icons';
import ConfirmModal from '../components/ConfirmModal.jsx'


const ProductDetailScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const [productSelected, setProductSelected] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [counter, setCounter] = useState(1)

  const productId = useSelector(state => state.shopReducer.productIdSelected)

  const {data: productById, isLoading, error } = useGetProductByIdQuery(productId)
  

  useEffect(()=>{
    if (!isLoading) {
      const productValue = Object.values(productById)
      setProductSelected(productValue[0])
    }
  }, [isLoading, productById])


  
  const onAddToCart = () => {
    dispatch(addItem({...productSelected, quantity: counter}))
    setModalVisible(true)
  }

  const Counter = () => (
    <View style={styles.counter}>
      <TouchableOpacity
        style={styles.counterBtn}
        onPress={() => { counter > 1 ? setCounter(counter - 1) : 1 }}  
      >
        <AntDesign name="minuscircleo" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.counterText}>{counter}</Text>
      <TouchableOpacity
        style={styles.counterBtn}
        onPress={() => { counter < productSelected.stock ? setCounter(counter + 1) : productSelected.stock }}  
      >
        <AntDesign name="pluscircleo" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )


  return (
    <>
      {
        !productSelected
        ?
        <ActivityIndicator />
        :
        <>
          <ScrollView style={styles.itemContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageProduct}
                resizeMode='cover'
                source={{uri: productSelected.thumbnail }}
              />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.title}>{productSelected.title}</Text>
              <Text style={styles.description}>{productSelected.description}</Text>
              <Text style={styles.price}>$ {productSelected.price?.toLocaleString('es-AR')}</Text>
              <Text style={styles.stock}>{productSelected.stock > 0 ? `Stock: ${productSelected.stock} unidades` : `Producto sin stock`}</Text>
              <Counter />
              <TouchableOpacity style={styles.buyButton} onPress={onAddToCart}>
                <Text style={styles.buyText}>Comprar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ConfirmModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            navigation={navigation}
            label="Producto Agregado"
          />
          
        </>
      }
    </>
  )
}



export default ProductDetailScreen


const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.whiteBlue,
  },
  imageContainer: {
    margin: 10,
    padding: 10,
    width: '95%',
    height: 300,
    backgroundColor: COLORS.white,
    borderRadius: 20
  },
  imageProduct: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  detailContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 26,
    color: COLORS.secondary,
    textAlign: 'center'

  },
  description: {
    fontFamily: 'Raleway-Italic',
    fontSize: 14,
    paddingHorizontal: 15,
    color: COLORS.primary

  },
  stock: {
    fontFamily: 'Raleway-Italic',
    color: COLORS.secondary

  },
  price: {
    fontFamily: 'Raleway-Bold',
    fontSize: 28,
    color: COLORS.secondary
  },
  buyButton: {
    marginTop: 10,
    width: '95%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: COLORS.confirm,
    borderRadius: 10,
  },
  buyText: {
    fontFamily: 'Raleway-Bold',
    color: COLORS.primary,
    fontSize: 18,
    paddingVertical: 3
  },
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
  btnText: {
    color: COLORS.primary,
    fontFamily: 'Raleway-Italic',
    fontSize: 18
  },
  counter: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    height: 40
  },
  counterText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
  }
})