import { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { COLORS } from '../const/colors'

const Input = ({ label, isSecureEntry = false, error = "", onChange }) => {
    const [input, setInput] = useState()

    const onHandleChangeText = (text) => {
        setInput(text)
        onChange(text)
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onHandleChangeText}
                secureTextEntry={isSecureEntry}
                value={input}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent:'center',
        width: '80%',
        padding: 6
    },
    input:{
        borderWidth:1,
        borderColor:COLORS.primary,
        borderRadius: 15,
        width: '100%',
        backgroundColor: COLORS.secondary,
        color: COLORS.white,
        padding: 8,
        fontSize: 16
    },
    label:{
        fontFamily:'Raleway-Bold',
        color: COLORS.white,
        paddingLeft:5,
        marginBottom: 8,
        fontSize: 16
    },
    error:{
        padding: 10,
        color: COLORS.error,
        fontSize: 16
    }
})