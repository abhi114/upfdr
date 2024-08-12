import { View, Text, Animated, TouchableOpacity, StyleSheet, PanResponder } from 'react-native'
import React from 'react'
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';

const ProfileTab = ({profileTabPosition, setShowProfileTab}) => {
  const resetpassword = () => {
    navigation.navigate('ResetPassword');
    setShowProfileTab(false);
  };
  const navigation = useNavigation();
  const logout = () => {
    
    navigation.reset({
      index: 0,
      routes: [{name: 'Register'}],
    });
    
  };
  const profilePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: profileTabPosition,
      },
    ]),
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dy > 100) {
        //setShowProfileTab(false);
        Animated.timing(profileTabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else if (gesture.dy < -100) {
        Animated.timing(profileTabPosition, {
          toValue: 0,
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
    },
  });
  return (
    <Animated.View
      style={[
        styles.profileTab,
        {
          transform: [{translateY: profileTabPosition}],
        },
      ]}
      {...profilePanResponder.panHandlers}>
      {/* Profile tab content here */}
      <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20}}>
        Profile
      </Text>
      <View
        style={{
          height: 1, // thickness of the line
          width: '100%', // width of the line
          backgroundColor: '#ccc',
        }}
      />

      <TouchableOpacity
        style={{flexDirection: 'column', marginTop: 10}}
        onPress={resetpassword}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#000000',
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10, // add space between the image and the text
            }}>
            <Icon3 name="settings-outline" size={20} color={'#FFFF00'} />
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Reset Password
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 8,
          height: 1, // thickness of the line
          width: '100%', // width of the line
          backgroundColor: '#ccc',
        }}
      />
      <TouchableOpacity
        style={{flexDirection: 'column', marginTop: 10}}
        onPress={logout}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#000000',
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10, // add space between the image and the text
            }}>
            <Icon name="logout" size={20} color={'#FF0000'} />
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  profileTab: {
    position: 'absolute',
    top: '6%',
    left: '10%',
    right: 50,
    height: 200,
    backgroundColor: '#282C34',
    borderRadius: 10,
    padding: 15,
  },
});

export default ProfileTab