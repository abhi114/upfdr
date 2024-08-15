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
} from 'react-native';

import { data } from './data';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const RoadList = () => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();
  // Filtered data based on search input
  const filteredData = data.filter(
    item =>
      item.packageNumber.includes(search) ||
      item.roadName.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()),
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const handlePress = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  // Slice the data for the current page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Function to go to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginBottom: 15}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={{color: '#0000FF'}}>Dashboard </Text>
        </TouchableOpacity>
        <Text style={{color: '#FFFFFF'}}>/ UP FDR Roads List</Text>
      </View>
      <Text style={styles.title}>UP FDR Roads List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by package number or road name or district"
        placeholderTextColor="#aaaaaa"
        value={search}
        onChangeText={text => {
          setSearch(text);
          setCurrentPage(1); // Reset to the first page on new search
        }}
      />
      <FlatList
        data={paginatedData}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>Package:</Text>
              <Text style={styles.cell}>{item.packageNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>FDR Group:</Text>
              <Text style={styles.cell}>{item.fdrGroup}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>District:</Text>
              <Text style={styles.cell}>{item.district}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>Block:</Text>
              <Text style={styles.cell}>{item.block}</Text>
            </View>
            
            <TouchableOpacity onPress={() => handlePress(item)}>
              <Text style={styles.detailsButton}>See Full Details</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      {selectedItem && (
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
                fontWeight:'bold'
              }}>
              Detailed View
            </Text>
            <ScrollView
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: '#191C24',
              }}>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Package:</Text>
                <Text style={styles.cell}>{selectedItem.packageNumber}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>FDR Group:</Text>
                <Text style={styles.cell}>{selectedItem.fdrGroup}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>District:</Text>
                <Text style={styles.cell}>{selectedItem.district}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Block:</Text>
                <Text style={styles.cell}>{selectedItem.block}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Road Name:</Text>
                <Text style={styles.cell}>{selectedItem.roadName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Year Sanctioned:</Text>
                <Text style={styles.cell}>{selectedItem.yearSanctioned}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>IMS Batch:</Text>
                <Text style={styles.cell}>{selectedItem.imsBatch}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Total Length:</Text>
                <Text style={styles.cell}>{selectedItem.totalLength} km</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Sanctioned Amount:</Text>
                <Text style={styles.cell}>
                  ₹{selectedItem.sanctionedAmount}{' '}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}> PavementCost:</Text>
                <Text style={styles.cell}>₹{selectedItem.PavementCost} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}> PavementCostUnit:</Text>
                <Text style={styles.cell}>
                  ₹{selectedItem.PavementCostUnit}{' '}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}> CarriageWidth:</Text>
                <Text style={styles.cell}>₹{selectedItem.CarriageWidth} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}> TrafficName:</Text>
                <Text style={styles.cell}>₹{selectedItem.TrafficName} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}> TotalCost:</Text>
                <Text style={styles.cell}>₹{selectedItem.TotalCost} </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}> AverageCost:</Text>
                <Text style={styles.cell}>₹{selectedItem.AverageCost} </Text>
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <View style={styles.pagination}>
        <Button
          borderRadius={20}
          title="Previous"
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
          color="#8B0000"
        />
        <Text
          style={
            styles.pageIndicator
          }>{`Page ${currentPage} of ${totalPages}`}</Text>
        <Button
          title="Next"
          onPress={handleNextPage}
          disabled={currentPage === totalPages}
          color="#8B0000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  detailsButton: {
    color: '#1e90ff',
    height:20,
    width:'100%',
    textAlign: 'center',
    marginTop: 30,
    textDecorationLine: 'underline',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
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
    margin:5,
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
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
    marginHorizontal:'32%',
    borderRadius: 20,
    marginBottom:10
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

export default RoadList;
