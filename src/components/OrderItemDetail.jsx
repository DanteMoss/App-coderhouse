import { 
  View, 
  Text, 
  StyleSheet, 
  Image
} from "react-native";

import Card from "./Card";

import { COLORS } from "../const/colors";

const OrderItemDetail = ({ item }) => {


  const total = item.price * item.quantity

  return (
    <View style={styles.orderItemContainer}>
      <Image
        style={styles.imageOrderItem}
        resizeMode="contain"
        source={{ uri: item.thumbnail }}
      />
      <View>
        <Text style={styles.orderTitle}>{item.title}</Text>
        <Text style={styles.orderLightText}>{item.brand}</Text>
        <Text style={styles.orderTotalPrice}>
          Cant: {item.quantity}, Total: ${total.toLocaleString('es-AR')}
        </Text>
      </View>
    </View>
  );
};

export default OrderItemDetail;

const styles = StyleSheet.create({
  orderItemContainer: {
    width: 290,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageOrderItem: {
    height: 100,
    width: 50,
    marginRight: 10,
  },
  orderTitle: {
    fontFamily: "Raleway-Bold",
    textTransform: "capitalize",
    fontSize: 16,
    width: '90%'
  },
  orderLightText: {
    fontFamily: "Raleway-Regular",
    textTransform: "capitalize",
    fontSize: 12,
  },
  orderTotalPrice: {
    fontFamily: "Raleway-Bold",
    textTransform: "capitalize",
    fontSize: 14,
    color: COLORS.primary,
    width: '100%'

  },
});
