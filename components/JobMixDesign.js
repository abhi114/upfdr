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

import {TrailData as data} from './data';
import {useNavigation} from '@react-navigation/native';
import {Modal} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Parser} from 'json2csv';
import RoadListModal from './Modals/RoadListModal';
import XLSX from 'xlsx';
import JMFChart from './Helpers/JMFChart';
var RNFS = require('react-native-fs');

const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const JobMixDesign = () => {
  
  const navigation = useNavigation();
  // Filtered data based on search input
  

  // Calculate the total number of pages
 

  // Function to go to the next page
  

  // Functi
   const data = [
     {
       name: 'Unique Roads with JMFs',
       population: 685,
       color: '#26A69A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
     {
       name: 'Repeat JMFs on Road',
       population: 429,
       color: '#EC407A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
   ];
   const data1 = [
     {
       name: 'Recommended',
       population: 734,
       color: '#26A69A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
     {
       name: 'Not Recommended',
       population: 391,
       color: '#EC407A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
     {
       name: 'Action Pending',
       population: 10,
       color: '#FFCE56',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
   ];
   const data2 = [
     {
       name: 'Recommended',
       population: 715,
       color: '#26A69A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
     {
       name: 'Not Recommended',
       population: 14,
       color: '#EC407A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
     {
       name: 'Action Pending',
       population: 5,
       color: '#FFCE56',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
   ];
   const data3 = [
     {
       name: 'Pending Roads',
       population: 36,
       color: '#26A69A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
     },
     {
       name: 'PIU Recommended',
       population: 715,
       color: '#EC407A',
       legendFontColor: '#7F7F7F',
       legendFontSize: 15,
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
          <Text style={{color: '#FFFFFF'}}>/ JMF Report</Text>
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            JMF Count:Unique/Repeat (Total:1114)
          </Text>
          <JMFChart data={data} />
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            JMF Status: PMU Level (Out of 1114)
          </Text>
          <JMFChart data={data1} />
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            JMF Status: PIU Level (Out of 734)
          </Text>
          <JMFChart data={data2} />
        </View>
        <View style={styles.card}>
          <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
            JMF Status: PIU Recommended Out of Active (679)
          </Text>
          <JMFChart data={data3} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default JobMixDesign;
