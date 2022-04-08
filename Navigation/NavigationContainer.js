//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigationScreen from './BottomNavigationScreen';
import { Provider } from "react-redux"
import configureStore from '../config/store';
const { store, persistor } = configureStore();

// create a component
const Stack = createStackNavigator();
const NavigationContainers = () => {
    return (
        <Provider store={store}>
                <NavigationContainer>
                <Stack.Navigator initialRouteName="bottom">
                        <Stack.Screen
                            name='bottom'
                            component={BottomNavigationScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                </Stack.Navigator>
            </NavigationContainer>

        </Provider>
            
    
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default NavigationContainers;
