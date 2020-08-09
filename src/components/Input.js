import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
// import { ScaledSheet } from "react-native-size-matters";

function Input(props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#F4A460"
                value={props.value}
                autoCorrect={false}
                {...props}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "#F4A460",
        borderWidth: 1,
        paddingLeft: 10
    }
});
export default Input;

