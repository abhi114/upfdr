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
  Image,
} from 'react-native';

import {SiteManagement as data} from './data';
import {useNavigation} from '@react-navigation/native';
import {Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Parser} from 'json2csv';
import RoadListModal from './Modals/RoadListModal';
import XLSX from 'xlsx';
var RNFS = require('react-native-fs');

const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const JMFRecommendedPMU = () => {
  const [search, setSearch] = useState('');
  const [userData, setuserData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);
  const [graphModalVisible, setgraphModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainSelectedItem, setmainSelectedItem] = useState(null);
  const navigation = useNavigation();
  // Filtered data based on search input
  const filteredData = userData.filter(
    item =>
      item.District.toLowerCase().includes(search.toLowerCase()) ||
      item.PackageNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.FDRGroup.toLowerCase().includes(search.toLowerCase()),
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
  const DownloadExcel = async () => {
    // Created Sample data
    let sample_data_to_export = data;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    console.log(
      ' main path is ' + RNFS.DownloadDirectoryPath + '/SiteManagement.xlsx',
    );
    // Write workbook to an array buffer
    const wbout = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});

    // Convert array buffer to binary string
    const binaryStr = new Uint8Array(wbout).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    // Write generated excel to Storage
    RNFS.writeFile(
      RNFS.DownloadDirectoryPath + '/SiteManagement.xlsx',
      binaryStr,
      'ascii',
    )
      .then(() => {
        console.log('success');
      })
      .catch(e => {
        console.log('Error', e);
      });
  };

  const generateCSV = async () => {
    //manully creating csv
    try {
      // Extract the keys (column names)
      const keys = Object.keys(data[0]);

      // Create CSV header
      const csvHeader = keys.join(',') + '\n';

      // Create CSV rows
      const csvRows = data
        .map(row => keys.map(key => row[key]).join(','))
        .join('\n');

      // Combine header and rows
      const csvContent = csvHeader + csvRows;

      // Define the file path
      const filePath = `${RNFS.DownloadDirectoryPath}/SiteManagement.csv`;

      // Write the CSV to the file
      await RNFS.writeFile(filePath, csvContent, 'utf8');

      alert(`CSV saved to: Downloads`);
    } catch (err) {
      console.error('Error creating CSV: ', err);
    }
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
      <h1>Site Management</h1>
      <table>
        <thead>
          <tr>
            ${Object.keys(data[0])
              .map(key => `<th>${key}</th>`)
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${data
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
      fileName: 'SiteManagement',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    const destPath = `${RNFS.DownloadDirectoryPath}/SiteManagement.pdf`;
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
          <Text style={{color: '#FFFFFF'}}>/Site Management Plans</Text>
        </View>
        <View style={styles.card}>
          <Text
            style={{color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10}}>
            Roads With Site Management Plan Uploaded
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}>
                685
              </Text>
              <Text style={{color: '#aaaaaa', fontSize: 12}}>
                Number of Roads with Plan Uploaded
              </Text>
            </View>
            <View style={{margin: 2}}>
              <Icon name="road-variant" size={30} color={'#0000FF'} />
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View
            style={{
              backgroundColor: '#191C24',
              borderRadius: 10,
              padding: 12,
              marginBottom: 16,
              elevation: 4,
              flex: 1,
            }}>
            <Text
              style={{color: '#FFFFFF', fontWeight: 'bold', marginBottom: 10}}>
              Roads With Pending Site Management Plan
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text
                  style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}>
                  6
                </Text>
                <Text style={{color: '#aaaaaa', fontSize: 12}}>
                  Roads With Site Management Plans
                </Text>
              </View>
              <View style={{margin: 1}}>
                <Icon name="road-variant" size={30} color={'#ff0000'} />
              </View>
            </View>
          </View>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by District ,Package.No or Fdr Group"
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
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Upload Date:</Text>
                <Text style={styles.cell}>{item.UploadDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>FDR Group:</Text>
                <Text style={styles.cell}>{item.FDRGroup}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>District:</Text>
                <Text style={styles.cell}>{item.District}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Action:</Text>
                <TouchableOpacity
                  style={{
                    flex: 0.7,
                    borderRadius: 5,
                    alignSelf: 'center',
                    borderColor:
                      item.status === 'Recommended' ? '#00D25B' : '#F8AB00',
                    borderWidth: 2,
                    alignContent: 'center',
                  }}
                  onPress={() => {}}>
                  <Text
                    style={[
                      styles.cell,
                      {
                        color:
                          item.status === 'Recommended' ? '#00D25B' : '#F8AB00',
                      },
                    ]}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Package Number:</Text>
                <TouchableOpacity
                  style={{
                    flex: 0.7,
                    borderRadius: 5,
                    alignSelf: 'center',
                    borderColor: '#0090E7',
                    borderWidth: 2,
                    alignContent: 'center',
                  }}
                  onPress={() => {}}>
                  <Text style={[styles.cell, {color: '#0090E7'}]}>
                    {item.PackageNumber}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.detailsButton}>See Full Details</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.uploadDate}
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
                  fontWeight: 'bold',
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
                  <Text style={styles.cellTitle}>Upload Date:</Text>
                  <Text style={styles.cell}>{selectedItem.UploadDate}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Package Number</Text>
                  <Text style={styles.cell}>{selectedItem.PackageNumber}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Site Address:</Text>
                  <Text style={styles.cell}>{selectedItem.SiteAddress}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>District:</Text>
                  <Text style={styles.cell}>{selectedItem.District}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>FDR group:</Text>
                  <Text style={styles.cell}>{selectedItem.FDRGroup}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Contractor:</Text>
                  <Text style={styles.cell}>{selectedItem.Contractor}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>No.Resources</Text>
                  <Text style={styles.cell}>{selectedItem.NoOfResources}</Text>
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

export default JMFRecommendedPMU;
