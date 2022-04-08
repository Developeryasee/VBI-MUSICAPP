/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import NavigationContainers from './Navigation/NavigationContainer';



const App: () => Node = () => {
  
  return (
    <View style={styles.Container}>
      <NavigationContainers/>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor:'red'
  },
});

export default App;
