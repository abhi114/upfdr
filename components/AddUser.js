import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const AddUserForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyDistrict, setCompanyDistrict] = useState('');
  const [userType, setUserType] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Handle form submission logic here
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Submit the form
  };

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Add User</Text>
      <Text style={styles.subHeader}>New User Details</Text>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name of Contact Person"
        placeholderTextColor="#A0A0A0"
      />

      {/* Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#A0A0A0"
      />

      {/* Email */}
      <Text style={styles.label}>Email ID</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email ID"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        placeholderTextColor="#A0A0A0"
        keyboardType="phone-pad"
      />

      {/* Company/District */}
      <Text style={styles.label}>Company/District</Text>
      <TextInput
        style={styles.input}
        value={companyDistrict}
        onChangeText={setCompanyDistrict}
        placeholder="Name of Company (in case of Contractor) or District (in case of PIU)"
        placeholderTextColor="#A0A0A0"
      />

      {/* User Type Picker */}
      <Text style={styles.label}>User Type</Text>
      <RNPickerSelect
        onValueChange={value => setUserType(value)}
        items={[
          {label: 'Contractor', value: 'contractor'},
          {label: 'PIU', value: 'piu'},
        ]}
        style={pickerSelectStyles}
        placeholder={{label: 'Select User Type', value: null}}
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Re-Enter Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />

      {/* Register Button */}
      <Button title="Register" color="#00FF00" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#191C24',
    padding: 20,
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

export default AddUserForm;
