import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { 
  useDispatch, 
  useSelector 
} from "react-redux";


import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../const/colors";

import { logout } from "../features/authSlice";
import { deleteSession } from '../db'

const Header = ({ title, navigation }) => {

  const email = useSelector(state => state.authReducer.user)
  const localId = useSelector(state => state.authReducer.localId)

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
    const deletedSession = deleteSession()
    console.log(deletedSession)
  }

  return (
        <View style={styles.headerContainer}>
          {
            navigation.canGoBack()
            ?
            <TouchableOpacity onPress={navigation.goBack}>
                <AntDesign name="left" size={20} color={COLORS.white} />
            </TouchableOpacity>
            :
            <View /> // Forma provisoria
          }
          
          <Text style={styles.headerTitle}>{title}</Text>
          {
            email && 
            <TouchableOpacity onPress={onLogout}>
              <AntDesign name="logout" size={20} color={COLORS.white} />
            </TouchableOpacity>
          }
        </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: COLORS.secondary,
  },
  headerTitle: {
    color: COLORS.white,
    fontFamily: "Raleway-Bold",
    fontSize: 20,
    textTransform: 'capitalize',
    
  }
});
