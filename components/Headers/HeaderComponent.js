import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon2 from 'react-native-vector-icons/Entypo';

const Header = ({handleAddUserPress, handleProfilePress, handleTabPress}) => {
  //console.log('function is' + newfunction);
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>UTTAM-FDR</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={handleAddUserPress}>
          <Icon2
            name="circle-with-plus"
            size={25}
            style={styles.tabIcon}
            color={'#00D25B'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image source={require('../logo_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTabPress}>
          <Icon1
            name="three-bars"
            size={25}
            style={styles.tabIcon}
            color={'#64698C'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#191C24',
  },
  tabIcon: {
    marginTop: 5,
    width: 32,
    height: 32,
    
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    marginTop: 2,
    marginRight:15,
    marginLeft:5,
    width: 32,
    height: 32,
    borderRadius: 80,
  },
});

export default Header;
