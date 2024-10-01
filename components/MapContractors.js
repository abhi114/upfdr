import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const MapContractors = () => {
 
  const [userType, setUserType] = useState(null);
  const [packageType,setPackageType] = useState(null);
 const navigation = useNavigation();
  const handleRegister = () => {
    // Handle form submission logic here
   
  };

  return (
    <View>
      <View style={{flexDirection: 'row', margin: 15}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: '#0000FF'}}>Dashboard</Text>
        </TouchableOpacity>
        <Text style={{color: '#FFFFFF'}}> / Map User</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>Map Road Users</Text>
        <Text style={styles.subHeader}>Map Users with Their Roads</Text>

        {/* User Type Picker */}
        <Text style={styles.label}>User </Text>
        <RNPickerSelect
          onValueChange={value => setUserType(value)}
          items={[
            {label: 'Contractor', value: 'contractor'},
            {label: 'PIU', value: 'piu'},
            {label: 'Rajesh Rastogi', value: 'Rajesh Rastogi'},
          ]}
          style={pickerSelectStyles}
          placeholder={{label: 'Select User', value: null}}
        />

        <Text style={styles.label}>Package</Text>
        <RNPickerSelect
          onValueChange={value => setPackageType(value)}
          items={[
            {label: 'UP13193|Barabanki', value: 'UP13193|Barabanki'},
            {label: 'UP13193|Barabanki', value: 'UP13193|Barabanki'},
          ]}
          style={pickerSelectStyles}
          placeholder={{label: 'Select Package', value: null}}
        />

        {/* Register Button */}
        <Button title="Map User" color="#00FF00" onPress={handleRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom:30,
    backgroundColor: '#191C24',
    margin:10,
    padding:15,
    borderRadius: 10,
  },
  header: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#292C34',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    backgroundColor: '#292C34',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputAndroid: {
    backgroundColor: '#292C34',
    color: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
};

export default MapContractors;
