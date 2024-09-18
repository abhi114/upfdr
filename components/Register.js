import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInputFocused, setEmailInputFocused] = useState(false);
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

  // Refs for animated values
  const emailInputScale = useRef(new Animated.Value(1)).current;
  const passwordInputScale = useRef(new Animated.Value(1)).current;
  const emailInputGlowOpacity = useRef(new Animated.Value(0)).current;
  const passwordInputGlowOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const handleLogin = () => {
    // Perform login logic here
    
    const validateEmail = () => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = re.test(email);
      return isEmailValid
    };
    if(!validateEmail()){
     console.log("not valuid")
     //return;
    }
    navigation.navigate('WelcomeAnimation');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  // Animation for growing and glowing input fields
  const animateInput = (inputScale, glowOpacity) => {
    Animated.sequence([
      Animated.timing(inputScale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(inputScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (emailInputFocused) {
      animateInput(emailInputScale, emailInputGlowOpacity);
    }
  }, [emailInputFocused]);

  useEffect(() => {
    if (passwordInputFocused) {
      animateInput(passwordInputScale, passwordInputGlowOpacity);
    }
  }, [passwordInputFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image source={require('./logo_login.png')} style={styles.logo} />
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.inputContainer}>
          <Animated.View
            style={[
              styles.input,
              {
                transform: [{scale: emailInputScale}],
              },
            ]}>
            <View style={{width: '100%', height: '100%'}}>
              <Icon1
                name="email"
                size={20}
                color={'#000'}
                style={{top: 8, left: -10}}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                onFocus={() => setEmailInputFocused(true)}
                onBlur={() => setEmailInputFocused(false)}
              />
            </View>
          </Animated.View>
        </View>

        <View style={styles.inputContainer}>
          <Animated.View
            style={[styles.input, {transform: [{scale: passwordInputScale}]}]}>
            <View style={{width: '100%', height: '100%'}}>
              <Icon1
                name="lock"
                size={20}
                color={'#FF0000'}
                style={{top: 8, left: -10}}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                onFocus={() => setPasswordInputFocused(true)}
                onBlur={() => setPasswordInputFocused(false)}
              />
            </View>
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.status}>Currently logged out.</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by Techssseract</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    marginBottom: 30,
  },
  inputContainer: {
    // Container for input and icon
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputIcon: {
    // Style for icon images
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    flex: 1,
    color: 'black',
    position: 'relative',
  },
  textInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    color: 'black',
  },
  inputGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: 'gold',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginTop: 15,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
});

export default LoginScreen;
