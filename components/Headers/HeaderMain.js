import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DrawerTab from './DrawerTab';
import ProfileTab from './ProfileTab';
import Header from './HeaderComponent';
import RoadList from '../RoadList';

const DrawerMain = ({pageName,route}) => {
  const {index} = route.params;
  const [screenName,setScreenName] = useState();
  const [showTab, setShowTab] = useState(false);
  const [tabPosition, setTabPosition] = useState(new Animated.Value(300));
  const [showProfileTab, setShowProfileTab] = useState(false);
  const [profileTabPosition, setProfileTabPosition] = useState(
    new Animated.Value(0),
  );
  useEffect(() => {
    if(index === 0 ){
      setScreenName('RoadList');
    }
  }, [index])
  
  console.log("index taken" + index);
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
          handleProfilePress={handleProfilePress}
          handleTabPress={handleTabPress}
        />
        {index===0 && (<RoadList/>)}
        {showTab && (
          <DrawerTab setShowTab={setShowTab} tabPosition={tabPosition} screenname={screenName}/>
        )}
        {showProfileTab && (
          <ProfileTab profileTabPosition={profileTabPosition} />
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
});

export default DrawerMain;
