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
  Alert,
} from 'react-native';

import * as data from './data';
import {useNavigation} from '@react-navigation/native';
import {Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import XLSX from 'xlsx';
import {Parser} from 'json2csv';
import SCKmPhoto from './SCKmPhoto';

var RNFS = require('react-native-fs');
const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const AllSCList = ({name, dataName}) => {
  console.log('name is' + name);
  console.log('data name is ' + dataName);
  const [search, setSearch] = useState('');
  const [userData, setuserData] = useState(data[dataName]);
  const [modalVisible, setModalVisible] = useState(false);
  const [graphModalVisible, setgraphModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainSelectedItem, setmainSelectedItem] = useState(null);
   const [DateModalVisible, setDateModalVisible] = useState(false);
  const navigation = useNavigation();
  // Filtered data based on search input
  const filteredData = userData.filter(
    item =>
      item.district.includes(search) ||
      item.contractor.toLowerCase().includes(search.toLowerCase()) ||
      item.fdrGroup.toLowerCase().includes(search.toLowerCase()),
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const handlePress = (key, item) => {
    if (key === 'uploadDate') {
      console.log('item is ' + item);
      setSelectedItem(item);
      setModalVisible(true);
    }else if(key === 'Action'){
      console.log('item is ' + item);
        setSelectedItem(item);
        setDateModalVisible(true);
    }
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
  const changeStatus = selectedid => {
    //console.log(id);
    const indexToUpdate = userData.findIndex(item => item.id === selectedid);

    if (indexToUpdate !== -1) {
      const updatedUserData = [...userData];
      updatedUserData[indexToUpdate].Status =
        !updatedUserData[indexToUpdate].Status;
      setuserData(updatedUserData);
    }
    console.log(paginatedData[indexToUpdate].Status);
  };
  const generateCSV = async () => {
    //manully creating csv
    try {
      // Extract the keys (column names)
      const keys = Object.keys(userData[0]);

      // Create CSV header
      const csvHeader = keys.join(',') + '\n';

      // Create CSV rows
      const csvRows = userData
        .map(row => keys.map(key => row[key]).join(','))
        .join('\n');

      // Combine header and rows
      const csvContent = csvHeader + csvRows;
      const timestamp = new Date().getTime();
      // Define the file path
      const filePath = `${RNFS.DownloadDirectoryPath}/${dataName}_${timestamp}.csv`;

      // Write the CSV to the file
      await RNFS.writeFile(filePath, csvContent, 'utf8');

      alert(`CSV saved to: Downloads`);
    } catch (err) {
      console.error('Error creating CSV: ', err);
    }
  };
  const DownloadExcel = async () => {
    // Created Sample data
    let sample_data_to_export = userData;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    console.log(
      ' main path is ' + RNFS.DownloadDirectoryPath + `/${dataName}.xlsx`,
    );
    // Write workbook to an array buffer
    const wbout = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});

    // Convert array buffer to binary string
    const binaryStr = new Uint8Array(wbout).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');
    const timestamp = new Date().getTime();
    // Write generated excel to Storage
    RNFS.writeFile(
      RNFS.DownloadDirectoryPath + `/${dataName}_${timestamp}.xlsx`,
      binaryStr,
      'ascii',
    )
      .then(() => {
        console.log('success');
        alert('File Saved To Downloads Folder');
      })
      .catch(e => {
        console.log('Error', e);
      });
  };
  const generatePDF = async () => {
    let htmlContent = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: auto;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
          word-wrap: break-word;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
      <h1>Users List</h1>
      <table>
        <thead>
          <tr>
            ${Object.keys(userData[0])
              .map(key => `<th>${key}</th>`)
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${userData
            .map(
              row => `
            <tr>
              ${Object.values(row)
                .map(value => `<td>${value}</td>`)
                .join('')}
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    `;

    let options = {
      html: htmlContent,
      fileName: 'UsersList',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    const timestamp = new Date().getTime();
    const destPath = `${RNFS.DownloadDirectoryPath}/${dataName}_${timestamp}.pdf`;
    try {
      await RNFS.moveFile(file.filePath, destPath);
      alert(`PDF Downloaded to: ${destPath}`);
    } catch (err) {
      console.error('Error moving file: ', err);
    }
    //console.log(`PDF generated at: ${file.filePath}`);
  };
  const ExcelDownload = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn(err);
    }
    const readGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    const writeGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (!readGranted || !writeGranted) {
      console.log('Read and write permissions have not been granted');

      return;
    } else {
      console.log('granted');
      DownloadExcel();
    }
  };
  const handleMainPress = item => {
    setSelectedItem(item);
    setgraphModalVisible(!graphModalVisible);
  };

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
          <Text style={{color: '#FFFFFF'}}>/ {name}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by Contractor,District or FDR Group"
          placeholderTextColor="#aaaaaa"
          value={search}
          onChangeText={text => {
            setSearch(text);
            setCurrentPage(1); // Reset to the first page on new search
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#881B1B',
              margin: 5,
              padding: 5,
              borderRadius: 10,
            }}
            onPress={ExcelDownload}>
            <Text style={{color: '#FFFFFF', padding: 5}}>Excel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#881B1B',
              margin: 5,
              padding: 5,
              borderRadius: 10,
            }}
            onPress={generatePDF}>
            <Text style={{color: '#FFFFFF', padding: 5}}>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#881B1B',
              margin: 5,
              padding: 5,
              borderRadius: 10,
            }}
            onPress={generateCSV}>
            <Text style={{color: '#FFFFFF', padding: 5}}>CSV</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={paginatedData}
          renderItem={({item}) => (
            <View style={styles.card}>
              {Object.entries(item).slice(0,-1).map(([key, value], index) => (
                <View style={styles.row} key={key}>
                  <Text style={styles.cellTitle}>{key}:</Text>
                  {key === 'Action' ||
                  key === 'Package Number' ||
                  key === 'Status' ||
                  key === 'PMU Status' ? (
                    <TouchableOpacity
                      onPress={() => handlePress(key, item)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 0.8,
                        borderRadius: 6,
                        borderWidth: 2,
                        borderColor:
                          key === 'Status'
                            ? '#00D25B'
                            : key === 'PMU Status' && value === 'Accepted'
                            ? '#00D25B'
                            : key === 'PMU Status' && value !== 'Accepted'
                            ? '#FF0000'
                            : '#0000FF',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color:
                            key === 'Status'
                              ? '#00D25B'
                              : key === 'PMU Status' && value === 'Accepted'
                              ? '#00D25B'
                              : key === 'PMU Status' && value !== 'Accepted'
                              ? '#FF0000'
                              : '#0000FF',
                        }}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.cell}>{value}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
          keyExtractor={item => item.packageNumber}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={DateModalVisible}
          onRequestClose={() => setDateModalVisible(!DateModalVisible)}>
          <ScrollView
            style={{
              flex: 1,

              alignContent: 'center',
              margin: 5,
              backgroundColor: '#000000',
            }}>
            <SCKmPhoto selectedItem={selectedItem} />
          </ScrollView>
        </Modal>
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
                  fontWeight: 'bold',
                }}>
                {name}
              </Text>
              <ScrollView
                style={{
                  flex: 1,
                  margin: 5,
                  backgroundColor: '#191C24',
                }}>
                
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
  actionsCell: {
    textAlign: 'center',
    color: '#0000FF',
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
    fontSize: 24,
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
    marginTop: 10,
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

export default AllSCList;
