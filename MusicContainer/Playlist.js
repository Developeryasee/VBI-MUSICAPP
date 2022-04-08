//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SongListContainer from '../SongList/SongListContainer';
import LinearGradient from 'react-native-linear-gradient';
import PlayListContainer from '../PlayList/PlayListContainer';
import PlayListDetail from '../PlayList/PlayListDetail';
import AddSongContainer from '../PlayList/AddSongContainer';
// create a component
const Stack = createStackNavigator();
const PlayList = () => {
    return (
        <Stack.Navigator>

        <Stack.Screen
          name='PlayList'
          component={PlayListContainer}
          options={{
            title: "PlayList", //Set Header Title
  
            headerLeft: null,
            header:    // Your custom header
              props => <LinearGradient
                colors={['#F97B5A', '#F94D71']}
                start={{ x: 0.2, y: 0.2 }}
                style={{
                  flexDirection: "row",
                  height: 50,
                  marginTop: Platform.OS == "ios" ? 20 : 0,
                  alignItems: 'center',
                  // only for IOS to give StatusBar Space
                }}
              >
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: '#fff', marginLeft: 5, textAlign: 'center', marginLeft: 15 }}>Play List</Text>
  
              </LinearGradient>,
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold' //Set Header text style
            },
          }}
        >
  
        </Stack.Screen>

        <Stack.Screen
          name='PlayListDetail'
          component={PlayListDetail}
          options={{
            title: "PlayListDetail", //Set Header Title
  
            headerLeft: null,
            header:    // Your custom header
              props => <LinearGradient
                colors={['#F97B5A', '#F94D71']}
                start={{ x: 0.2, y: 0.2 }}
                style={{
                  flexDirection: "row",
                  height: 50,
                  marginTop: Platform.OS == "ios" ? 20 : 0,
                  alignItems: 'center',
                  // only for IOS to give StatusBar Space
                }}
              >
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 20, color: '#fff', marginLeft: 5, textAlign: 'center', marginLeft: 15 }}>PlayList Detail</Text>
  
              </LinearGradient>,
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontFamily: 'Montserrat-Bold' //Set Header text style
            },
          }}
        >
  
        </Stack.Screen>
        <Stack.Screen
          name='AddSong'
          component={AddSongContainer}
          options={{
            title: "AddSong", //Set Header Title
  
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
export default PlayList;
