import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { 
  PieChart,
} from 'react-native-chart-kit';
import { Chartdata } from '../data';
import ChartCard from '../ChartCard';
import RoadDetailsCard from '../RoadDetailsCard';
const data = [
  {
    step: '1',
    description: 'Joint Survey',
    toBeDoneBy: 'Contractor',
    status: 'Pending',
  },
  {
    step: '2',
    description: 'Sample Collection',
    toBeDoneBy: 'PIU',
    status: 'Complete',
  },
  {
    step: '3',
    description: 'Job Mix Design',
    toBeDoneBy: 'Contractor',
    status: 'Complete',
  },
  {
    step: '5',
    description: 'Trail of Equipments',
    toBeDoneBy: 'Contractor',
    status: 'Complete',
  },
  {
    step: '6',
    description: 'Lab Details',
    toBeDoneBy: 'Contractor',
    status: 'Complete',
  },
  {
    step: '7',
    description: 'Site Management Plan',
    toBeDoneBy: 'Contractor',
    status: 'Complete',
  },
  {
    step: '8 - A',
    description: 'Trial Stretch - Construction',
    toBeDoneBy: 'PIU',
    status: 'Go Ahead',
  },
  {
    step: '8 - B',
    description: 'Trial Stretch - Approval',
    toBeDoneBy: 'PIU',
    status: 'Download Approval Note',
    instruction:'Go Ahead'
  },
  {
    step: '9',
    description: 'Main Carriage Way',
    toBeDoneBy: 'PIU/Contractor',
    status: 'Go Ahead',
  },
  
];

const StatusIndicator = ({status}) => {
  let backgroundColor;
  switch (status) {
    case 'Complete':
      backgroundColor = '#0DD25B';
      break;
    case 'Pending':
      backgroundColor = '#FFAB13';
      break;
    case 'Go Ahead':
      backgroundColor = '#00D258';
      break;
    case 'Download Approval Note':
      backgroundColor = '#0E6DC8';
      break;
    default:
      backgroundColor = 'gray';
  }
  if(status === 'Download Approval Note'){
    return (
      <TouchableOpacity
        style={[
          styles.statusContainer,
          {borderColor: backgroundColor, borderWidth: 1},
        ]}>
        <Text style={[styles.statusText, {color: backgroundColor}]}>
          {status}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={[styles.statusContainer, {borderColor:backgroundColor,borderWidth:1}]}>
      <Text style={[styles.statusText,{color:backgroundColor}]}>{status}</Text>
    </View>
  );
};

const TableRow = ({item}) => (
  <View style={styles.row}>
    <View style={styles.cell}>
      <Text style={styles.cellText}>{item.step}</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.cellText}>{item.description}</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.cellText}>{item.toBeDoneBy}</Text>
    </View>
    <View style={[styles.cell, {alignItems: 'flex-end'}]}>
      <StatusIndicator status={item.status} />
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.header}>
    <View style={styles.cell}>
      <Text style={styles.headerText}>Step</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.headerText}>Description</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.headerText}>Assigned To</Text>
    </View>
    <View style={[styles.cell, {alignItems: 'flex-end'}]}>
      <Text style={styles.headerText}>Status</Text>
    </View>
  </View>
);
const CardView = ({item})=>{
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#191C24',
          padding: 15,
          borderRadius: 10,
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1, // Makes sure the card takes up full width of its column
          maxWidth: '48%', // Adjust this to handle margins properly (48% gives room for margin between two items)
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>
              {item.title}
            </Text>
            <Text style={{color: '#6C7293', fontSize: 12, marginTop: 4}}>
              {item.subtitle}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#2c2c2c',
              padding: 5,
              borderRadius: 5,
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: '#00FF00',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              ↗
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
}
const infoData = [
  {
    id: 1,
    title: 'Blacklead Infratech Private Limited | 8882358011',
    subtitle: 'Assigned Contractor',
  },
  {
    id: 2,
    title: 'Joint Surveys',
    subtitle: 'Manage Joint Survey Details',
  },
  {
    id: 3,
    title: 'View Mix Design Formula',
    subtitle: 'View Mix Design (Job Mix Formula) Details',
  },
  {
    id: 4,
    title: 'View Trial Stretch Details',
    subtitle: 'View PIU Trial Stretch Details',
  },
  {
    id: 5,
    title: 'Cube And Core Strength',
    subtitle: 'View Cube and Core Strength Details',
  },
  {
    id: 6,
    title: 'View Daily Work Progress',
    subtitle: 'View Daily Work Progress',
  },
  {
    id: 7,
    title:'Bills Raised',
    subtitle: 'View Bills Raised',
  }
];
const App = ({selectedItem, setgraphModalVisible}) => {
  console.log('done here is' + selectedItem.packageNumber);
  return (
    <ScrollView
      style={{
        flex: 1,
        alignContent: 'center',
        margin: 5,
        backgroundColor: '#000000',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: '#191C24',
          padding: 15,
          borderRadius: 2,
          flexDirection: 'row',
          alignItems: 'center',
        }} onPress={()=>{setgraphModalVisible(false)}}>
        <Text style={{color: '#FFFFFF', fontSize: 12, padding: 5}}>{'<'}</Text>
        <Text style={{color: '#0000FF'}}>UP FDR ROAD LIST </Text>
        <Text style={{color: '#FFFFFF'}}>/ {selectedItem.packageNumber}</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: '#FFFFFF',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              margin: 10,
            }}>
            To-Do List
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              justifyContent: 'center',

              fontSize: 15,
              marginHorizontal: 10,
              marginBottom: 5,
            }}>
            Progress Status of the Road
          </Text>
          <TableHeader />
          <FlatList
            data={data}
            keyExtractor={item => item.step}
            renderItem={({item}) => <TableRow item={item} />}
          />
        </View>
      </View>

      <FlatList
        data={infoData}
        keyExtractor={item => item.id}
        renderItem={({item}) => <CardView item={item} />}
        numColumns={2} // This sets two items per row
        columnWrapperStyle={styles.columnWrapper} // Optional: for styling the row
      />
      <ChartCard />
      <RoadDetailsCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2c2c2c',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    // Set the width of each card to be the full width of the screen minus some padding
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Ensures even spacing between items
  },
  step: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 5,
  },
  toBeDoneBy: {
    color: '#b0b0b0',
    fontSize: 14,
    marginBottom: 10,
  },
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#191C24',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  headerText: {
    color: '#6C7293',
    fontWeight: 'bold',
  },
  cellText: {
    color: '#b0b0b0',
    
  },
  statusContainer: {
    padding: 5,
    borderRadius: 5,
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
