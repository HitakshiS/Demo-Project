import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import Home from './src/screens/Home';
import { ListProvider } from './src/context/ListContext';
import { createStore, applyMiddleware } from "redux";
import AppNavigator from './src/Navigator/AppNavigator';
import RootReducer from "./src/Store/RootReducer";
import { Provider } from "react-redux";


const store = createStore(RootReducer);
export default class App extends Component {
  constructor(props) {
    console.disableYellowBox = true;
    super();
  }


  render() {
    return (
      <Provider store={store}>

        {Platform.OS === "ios" ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#F4A460" }}>
            <AppNavigator />
          </SafeAreaView>
        ) : (
            <AppNavigator />
          )}
      </Provider>
    );
  }
}