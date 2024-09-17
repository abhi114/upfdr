import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import JMFChart from './Helpers/JMFChart';
var RNFS = require('react-native-fs');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const Bills = () => {
  const navigation = useNavigation();
  // Filtered data based on search input

  // Calculate the total number of pages

  // Function to go to the next page

  // Functi
  const cardPress = (id)=>{
    if(id === '1'){
        navigation.navigate('BillDetails', {
          name: 'Contractor Bills Report',
          dataName: 'ContractorBillsReport',
        });
    }
     if (id === '3') {
       navigation.navigate('MobilizationAdvanceList', {
         name: 'Mobilization Advance List',
         dataName: 'MobilizationAdvanceList',
       });
     }else if(id === '4'){
       navigation.navigate('BillDetails', {
         name: 'Bills Approved By PIU',
         dataName: 'BillsApprovedPIU',
       });
     }
  }
  const data = [
    {
      id: 'null',
      name: 'Bill Uploaded',
      population: 568,
      color: '#26A69A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      id: 'null',
      name: 'Bill Approved By PIU',
      population: 825,
      color: '#EC407A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  const data1 = [
    {
      id: 'null',
      name: 'Bill Uploaded',
      population: 568,
      color: '#26A69A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      id: 'null',
      name: 'Bill Not Approved',
      population: 204,
      color: '#EC407A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  const data2 = [
    {
      id: 'null',
      name: 'Bill Uploaded',
      population: 568,
      color: '#26A69A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      id: 'null',
      name: 'Bill Approved',
      population: 1084,
      color: '#EC407A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    
  ];
  const cardData = [
    {
      id: '1',
      headertitle: 'Total Bills Uploaded',
      number: '1841',
      subtext: 'Total Number of Bills Uploaded',
      icon: 'account-cash',
      iconColor: '#0000FF',
    },
    {
      id: '2',
      headertitle: 'No. of Roads where Bills Uploaded',
      number: '568',
      subtext: 'Number of Roads where Bills Uploaded',
      icon: 'road-variant',
      iconColor: '#0000FF',
    },
    {
      id: '3',
      headertitle: 'Mobilization Advance List',
      number: '175',
      subtext: 'Mobilization Advance List',
      icon: 'align-vertical-distribute',
      iconColor: '#00FF00',
    },
    {
      id: '4',
      headertitle: 'Bills Approved by PIU',
      number: '825',
      subtext: 'Number of Bills Approved by PIU',
      icon: 'account-cash',
      iconColor: '#00FF00',
    },
    {
      id: '5',
      headertitle: 'Bills Rejected by PIU',
      number: '204',
      subtext: 'Number of Bills Rejected by PIU',
      icon: 'account-cash',
      iconColor: '#FF0000',
    },
    {
      id: '6',
      headertitle: 'Pending Action by PIU',
      number: '812',
      subtext: 'Number of Bills Pending Action by PIU',
      icon: 'alert-circle-check',
      iconColor: '#FF0000',
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', marginBottom: 6}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: '#0000FF'}}>Dashboard </Text>
          </TouchableOpacity>
          <Text style={{color: '#FFFFFF'}}>/ Bills Raised By Contractors</Text>
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            Contractor Billing Status on Roads
          </Text>
          <JMFChart data={data} />
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            Status-Bill Rejected
          </Text>
          <JMFChart data={data1} />
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            Status - Bill Approved
          </Text>
          <JMFChart data={data2} />
        </View>
        {cardData.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={()=>{cardPress(item.id)}}>
            <Text
              style={{color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10}}>
              {item.headertitle}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}>
                  {item.number}
                </Text>
                <Text style={{color: '#aaaaaa', fontSize: 12}}>
                  {item.subtext}
                </Text>
              </View>
              <View style={{margin: 2}}>
                <Icon name={item.icon} size={30} color={item.iconColor} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  detailsButton: {
    color: '#1e90ff',
    height: 20,
    width: '100%',
    textAlign: 'center',
    marginTop: 30,
    textDecorationLine: 'underline',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 12,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#191C24',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#444444',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#191C24',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  cellTitle: {
    color: '#aaaaaa',
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  pagination: {
    margin: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  pageIndicator: {
    color: '#ffffff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '100%',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalTitle: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 5,
  },
  modalText: {
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 16,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Bills;
