import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";

import Card from "./Card";

import { setCategorySelected } from "../features/shopSlice";
import { COLORS } from "../const/colors";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch();

  const nombreCat = category.name

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Productos", { nombreCat });
        dispatch(setCategorySelected(nombreCat));
      }}
    >
      <Card style={styles.cardContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: category.image }}
        ></Image>
        <Text style={styles.text}>{category.name}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    width: 155,
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textTransform: "capitalize",
    fontSize: 20,
    fontFamily: 'Raleway-Italic',
    color: COLORS.primary,
    textAlign: 'center'
  },
  image: {
    borderRadius: 10,
    width: 75,
    height: 100,
  }
});
