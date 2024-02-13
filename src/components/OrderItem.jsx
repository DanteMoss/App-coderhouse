import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../const/colors";

const OrderItem = ({ order, setModalVisible, setOrderId }) => {


  return (
    <View style={styles.cartItemContainer}>
      <View>
        <Text style={styles.orderNumber}>
          Orden: {order.orderId}
        </Text>
        <Text style={styles.createdAt}>
          Creada el {new Date(order.createdAt).toLocaleString('es-AR')}
        </Text>
        <Text style={styles.total}>Total: ${order.total.toLocaleString('es-AR')}</Text>
      </View>
      <TouchableOpacity 
        style={styles.searchIcon} 
        onPress={() => {
          setModalVisible(true)
          setOrderId(order.orderId)
        }}
      >
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    width: '95%',
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginTop: 15,
    marginHorizontal: 10,
  },
  searchIcon: {
    marginLeft: "auto",
  },
  orderNumber: {
    fontFamily: "Raleway-Regular",
    marginBottom: 5,
    fontSize: 14,
  },
  createdAt: {
    fontFamily: "Raleway-Light",
    marginBottom: 5,
    fontSize: 14,
  },
  total: {
    fontFamily: "Raleway-Bold",
    fontSize: 16,
  },
});
