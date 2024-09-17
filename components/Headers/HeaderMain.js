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
import ContractorsList from '../ContractorsList';
import PIUList from '../PIUList';
import LabDetails from '../LabDetails';
import JointSurveys from '../JointSurveys';
import SiteManagement from '../SiteManagement';
import TrailOfEquipment from '../TrailOfEquipment';
import SampleCollection from '../SampleCollection';
import JobMixDesign from '../JobMixDesign';
import TrialStretchGraph from '../TrialStretch/TrialStretchGraph';
import Bills from '../Bills';
import DailyWork from '../DailyWork';

const DrawerMain = ({pageName,route}) => {
  const {index, screenName, setScreenName} = route.params;
  
  const [showTab, setShowTab] = useState(false);
  const [tabPosition, setTabPosition] = useState(new Animated.Value(300));
  const [showProfileTab, setShowProfileTab] = useState(false);
  const [profileTabPosition, setProfileTabPosition] = useState(
    new Animated.Value(0),
  );
  useEffect(() => {
    if(index === 0 ){
      setScreenName('RoadList');
    }else if(index  === 1){
      setScreenName('UserManagement/ListUser');
    }else if(index ===2){
      setScreenName('Statistics/ListPIU');
    }else if(index === 5){
      setScreenName('JointSurveys');      
    }else if(index === 6){
      setScreenName('SiteManagement'); 
    }else if(index === 7){
      setScreenName('TrailOfEquipment');
    }else if(index === 8){
      setScreenName('SampleCollection');
    }else if(index === 9){
      setScreenName('JobMixDesign');
    }else if(index === 10){
      setScreenName('TrialStretchGraph');
    }else if(index === 11 || index === 12){
      setScreenName('Bills');
    }else if(index == 13){
      setScreenName('DailyWork');
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
  console.log( typeof setScreenName);
  return (
    <TouchableWithoutFeedback onPress={handleOutsideTabPress}>
      <View style={styles.container}>
        <Header
          handleProfilePress={handleProfilePress}
          handleTabPress={handleTabPress}
        />
        {index === 0 && <RoadList />}
        {(index === 1 || index === 3) && <ContractorsList />}
        {index === 2 && <PIUList />}
        {index === 4 && <LabDetails />}
        {index === 5 && <JointSurveys />}
        {index === 6 && <SiteManagement />}
        {index === 7 && <TrailOfEquipment />}
        {index === 8 && <SampleCollection />}
        {index === 9 && <JobMixDesign />}
        {index === 10 && <TrialStretchGraph />}
        {(index === 11 || index === 12) && (
          <DailyWork
            name={'Daily Work Progress List'}
            dataName={'DailyWorkProgress'}
          />
        )}
        {index === 13 && <DailyWork />}
        {showTab && (
          <DrawerTab
            setShowTab={setShowTab}
            tabPosition={tabPosition}
            screenname={screenName}
            setScreenName={setScreenName}
          />
        )}
        {showProfileTab && (
          <ProfileTab
            profileTabPosition={profileTabPosition}
            setShowProfileTab={setShowProfileTab}
            screenname={'Dashboard'}
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
});

export default DrawerMain;
