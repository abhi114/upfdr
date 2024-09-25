import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';

import DrawerTab from './Headers/DrawerTab';
import ProfileTab from './Headers/ProfileTab';
import Header from './Headers/HeaderComponent';
import AddUserForm from './AddUser';


const ResetPassword = ({route}) => {
  const {screenname,setScreenName} = route.params;
    const [showTab, setShowTab] = useState(false);
    const [tabPosition, setTabPosition] = useState(new Animated.Value(300));
    const [showProfileTab, setShowProfileTab] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
     const handleAddUserPress = () => {
       console.log('pressed it user add');
       setModalVisible(true);
     };
    const [profileTabPosition, setProfileTabPosition] = useState(
      new Animated.Value(0),
    );
     const [newPassword, setNewPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');

     const handleNewPasswordChange = text => {
       setNewPassword(text);
     };

     const handleConfirmPasswordChange = text => {
       setConfirmPassword(text);
     };

     const handleReset = () => {
       // Implement your password reset logic here
       console.log('Resetting password...');
     };
    const handleTabPress = () => {
      if (showProfileTab === true) {
        setShowProfileTab(!showProfileTab);
      }
      setShowTab(!showTab);
      //setAnimateTab(true);
      if (showTab) {
        console.log('hit design');
        Animated.spring(tabPosition, {
          toValue: 300,
          stiffness: 100,
          duration: 100,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start(() => {
          //setAnimateTab(false);
          //setShowTab(!showTab);
        });
      } else {
        console.log('hitting this spot');
        Animated.spring(tabPosition, {
          toValue: 0,
          stiffness: 100,
          duration: 100,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start(() => {
          //setAnimateTab(false);
        });
      }
    };

    const handleOutsideTabPress = () => {
      if (showTab) {
        setShowTab(false);
        Animated.timing(tabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      if (showProfileTab) {
        setShowProfileTab(false);
        Animated.timing(profileTabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    };
    const handleProfilePress = () => {
      if (showTab === true) {
        setShowTab(false);
      }
      setShowProfileTab(!showProfileTab);
      if (showProfileTab) {
        Animated.timing(profileTabPosition, {
          toValue: -300,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(profileTabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    };
  return (
    <TouchableWithoutFeedback onPress={handleOutsideTabPress}>
      <View style={styles.container}>
        <Header
          handleAddUserPress={handleAddUserPress}
          handleProfilePress={handleProfilePress}
          handleTabPress={handleTabPress}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              margin: 5,
              backgroundColor: '#191C24',
            }}>
            <Text
              style={{
                color: '#F1F1F1',
                alignSelf: 'center',
                margin: 30,
                color: '#ffffff',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Add User
            </Text>
            <ScrollView
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: '#191C24',
              }}>
              <AddUserForm />
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View
          style={{
            padding: 30,
            margin: 30,
            backgroundColor: '#191C24',
            borderRadius: 10,
          }}>
          <Text style={styles.title}>Update Password</Text>

          <Text style={styles.label}>Set New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleNewPasswordChange}
            value={newPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.copyright}>Copyright © Techsseract 2022</Text>
          <Text style={styles.powered}>
            Developed by <Text style={styles.highlight}>Techsseract</Text>{' '}
            powered by UPDESCO
          </Text>
        </View>
        {showTab && (
          <DrawerTab
            setShowTab={setShowTab}
            tabPosition={tabPosition}
            screenname={'ResetPassword'}
            setScreenName={setScreenName}
          />
        )}
        {showProfileTab && (
          <ProfileTab
            profileTabPosition={profileTabPosition}
            screenname={'ResetPassword'}
            setScreenName={setScreenName}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  copyright: {
    color: '#fff',
    fontSize: 12,
  },
  powered: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#00ff00',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginHorizontal: '32%',
    borderRadius: 20,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default ResetPassword;