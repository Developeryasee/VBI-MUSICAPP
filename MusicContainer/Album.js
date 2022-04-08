//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SongListContainer from '../SongList/SongListContainer';
import LinearGradient from 'react-native-linear-gradient';
import AlbumListContainer from '../Album/AlbumListContainer';
// create a component
const Stack = createStackNavigator();
const Album = () => {
    return (
        <Stack.Navigator>

        <Stack.Screen
          name='Albums'
          component={AlbumListContainer}
          options={{
            title: "Albums", //Set Header Title
  
            headerLeft: null,
            header:    // Your custom header
              props => null,
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold' //Set Header text style
            },
          }}
        >
  
        </Stack.Screen>
   
  
      </Stack.Navigator>
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
export default Album;
