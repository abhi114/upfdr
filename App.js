import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import StackNavigator from './navigation/StackNavigatior';
import Drawers from './components/Helpers/Drawers';



const Stack = createNativeStackNavigator();
export default App = () => {
  return (
    
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});