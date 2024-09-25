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
import ListUser from '../ListUser';
import { BarChart } from 'react-native-chart-kit';
import BarChartComponent from '../Helpers/BarChart';
import MappedContractorsList from '../MappedContractorsList';
import StartDate from '../SQMVisit/StartDate';
import { Modal } from 'react-native';
import AddUserForm from '../AddUser';

const DrawerMain = ({pageName,route}) => {
  const {index, screenName, setScreenName} = route.params;
  
  const [showTab, setShowTab] = useState(false);
  const [tabPosition, setTabPosition] = useState(new Animated.Value(300));
  const [showProfileTab, setShowProfileTab] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleAddUserPress =  ()=> {
    console.log('pressed it user add');
    setModalVisible(true);
  };
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
  const newfunction = ()=>{

  }
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

        {index === 0 && <RoadList name={'UP FDR Roads List'} />}
        {(index === 1 || index === 3) && <ContractorsList />}
        {index === 2 && <PIUList />}
        {index === 4 && <LabDetails />}
        {index === 5 && <JointSurveys />}
        {index === 6 && <SiteManagement />}
        {index === 7 && <TrailOfEquipment />}
        {index === 8 && <SampleCollection />}
        {index === 9 && <JobMixDesign />}
        {index === 10 && <TrialStretchGraph />}
        {(index === 11 || index === 12) && <Bills />}
        {index === 13 && <DailyWork />}
        {index === 14 && <RoadList name={'UP FDR Completed Roads List'} />}
        {index === 15 && <ListUser name={'Users List'} />}
        {index === 16 && <BarChartComponent />}
        {index === 17 && <MappedContractorsList />}
        {index === 18 && (
          <StartDate name={'MCW Start Requests'} dataName={'MCWStartDate'} />
        )}
        {index === 19 && (
          <StartDate
            name={'SQM Date Requests (For Core Testing)'}
            dataName={'SQMVisitCoreTesting'}
          />
        )}
        {index === 20 && (
          <StartDate name={'TS Data Requests'} dataName={'TsRequestsData'} />
        )}

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

export default DrawerMain;
