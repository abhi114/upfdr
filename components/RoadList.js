import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { data } from './data';
import { useNavigation } from '@react-navigation/native';

const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const RoadList = () => {
  const [search, setSearch] = useState('');
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
      <View style={{flexDirection: 'row',marginBottom:15}}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Text style={{color: '#0000FF'}}>Dashboard </Text>
        </TouchableOpacity>
        <Text style={{color: '#FFFFFF', }}>
          / UP FDR Roads List
        </Text>
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
            <View style={styles.row}>
              <Text style={styles.cellTitle}>Road Name:</Text>
              <Text style={styles.cell}>{item.roadName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>Year Sanctioned:</Text>
              <Text style={styles.cell}>{item.yearSanctioned}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>IMS Batch:</Text>
              <Text style={styles.cell}>{item.imsBatch}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>Total Length:</Text>
              <Text style={styles.cell}>{item.totalLength} km</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cellTitle}>Sanctioned Amount:</Text>
              <Text style={styles.cell}>₹{item.sanctionedAmount} </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
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
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
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
    marginBottom: 8,
  },
  cellTitle: {
    color: '#aaaaaa',
    flex: 1,
    fontWeight: 'bold',
  },
  cell: {
    color: '#ffffff',
    flex: 2,
    textAlign: 'right',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageIndicator: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default RoadList;
