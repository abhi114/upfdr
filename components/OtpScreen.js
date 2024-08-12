import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

const OtpScreen = ({route}) => {
    const {phoneNumber} = route.params
  
  const [otp, setOtp] = useState('');

  const navigation = useNavigation();

  const handleSendOTP = () => {
    // Perform OTP sending logic here
    //setIsOtpSent(true);
    console.log('Sending OTP to:', otp);
    navigation.navigate('Home',)
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
      <View style={styles.logoContainer}></View>
      <Icon1 name="email" size={20} color={'#000'} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>सत्यापन</Text>

        <Text style={styles.label}>
          कृपया अपने मोबाइल नंबर पर भेजा गया ओटीपी दर्ज करें
        </Text>

        <OTPTextView handleTextChange={e => setOtp(e)} inputCount={6} />

        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.note, {color: '#000'}]}>कोड नहीं मिला?</Text>
          <TouchableOpacity style={{}} onPress={handleSendOTP}>
            <Text style={styles.note}>ओटीपी पुनः भेजें</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>सत्यापित करें</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#337ab7',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align content to the bottom
  },
  logoContainer: {
    position: 'absolute',
    top: 200,
    zIndex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 125, // Adjust as needed
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 10,

    borderRadius: 25,
    width: '100%',
    height: '65%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 90,
  },
  label: {
    fontSize: 16,
    color: '#337ab7',
    marginTop: 10,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#337ab7',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    color: '#337ab7',
  },
  note: {
    fontSize: 14,
    color: '#337ab7',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#337ab7', // Blue color
    padding: 15,
    borderRadius: 25,
    width: '80%',
    marginTop: 45,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OtpScreen;
