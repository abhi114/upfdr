import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Register from '../components/Register';
import OtpScreen from '../components/OtpScreen';
import Home from '../components/Home';
import ResetPassword from '../components/ResetPassword';
import RoadList from '../components/RoadList';
import DrawerMain from '../components/Headers/HeaderMain';
import ContractorsList from '../components/ContractorsList';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OtpScreen"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RoadList"
        component={RoadList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="HeaderMain"
        component={DrawerMain}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ContractorsList"
        component={ContractorsList}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
