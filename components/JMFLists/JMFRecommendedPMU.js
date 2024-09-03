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

import * as data from '../data';
import {useNavigation} from '@react-navigation/native';
import {Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Parser} from 'json2csv';
import XLSX from 'xlsx';
var RNFS = require('react-native-fs');

const ITEMS_PER_PAGE = 5; // Adjust the number of items per page as needed

const JMFRecommendedPMU = ({route}) => {
  const {name, dataName} = route.params;
  const [search, setSearch] = useState('');
  const [userData, setuserData] = useState(data[dataName]);
  const [modalVisible, setModalVisible] = useState(false);
  const [graphModalVisible, setgraphModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainSelectedItem, setmainSelectedItem] = useState(null);
  const navigation = useNavigation();
  console.log(name);
  console.log(dataName);
  // Filtered data based on search input
  const filteredData = userData.filter(
    item =>
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.packageNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.fdrGroup.toLowerCase().includes(search.toLowerCase()),
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
      ' main path is ' + RNFS.DownloadDirectoryPath + `/${dataName}.xlsx`,
    );
    // Write workbook to an array buffer
    const wbout = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});

    // Convert array buffer to binary string
    const binaryStr = new Uint8Array(wbout).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    // Write generated excel to Storage
    RNFS.writeFile(
      RNFS.DownloadDirectoryPath + `/${dataName}.xlsx`,
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
      const filePath = `${RNFS.DownloadDirectoryPath}/${dataName}.csv`;

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
      <h1>${name}</h1>
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
      fileName: `${dataName}`,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    const destPath = `${RNFS.DownloadDirectoryPath}/${dataName}.pdf`;
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
        <View style={{flexDirection: 'row', marginBottom: 25}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: '#0000FF'}}>JMF Report</Text>
          </TouchableOpacity>
          <Text style={{color: '#FFFFFF'}}>/{name}</Text>
        </View>

        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            margin: 15,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
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
                <Text style={styles.cellTitle}>sl No:</Text>
                <Text style={styles.cell}>{item.slNo}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Date:</Text>
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
                    {item.date}
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
                    {item.packageNumber}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>FDR Group:</Text>
                <Text style={styles.cell}>{item.fdrGroup}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellTitle}>Job Mix Report:</Text>
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
                    Download Report
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => handlePress(item)}>
                <Text style={styles.detailsButton}>See Full Details</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.slNo}
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
                  <Text style={styles.cellTitle}>Sl No:</Text>
                  <Text style={styles.cell}>{selectedItem.slNo}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Package Number</Text>
                  <Text style={styles.cell}>{selectedItem.packageNumber}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Date:</Text>
                  <Text style={styles.cell}>{selectedItem.date}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>District:</Text>
                  <Text style={styles.cell}>{selectedItem.district}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>FDR group:</Text>
                  <Text style={styles.cell}>{selectedItem.fdrGroup}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Contractor:</Text>
                  <Text style={styles.cell}>{selectedItem.contractor}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Institution:</Text>
                  <Text style={styles.cell}>{selectedItem.institution}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>Additive:</Text>
                  <Text style={styles.cell}>{selectedItem.additive}</Text>
                </View>
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                  <Text style={styles.cellTitle}>durability:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.2,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor: '#FFFF00',
                      borderWidth: 1,
                      alignContent: 'center',
                      marginRight: 55,
                    }}
                    onPress={() => {}}>
                    <Text style={[styles.cell, {color: '#FFFF00'}]}>
                      {selectedItem.durability}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                  <Text style={styles.cellTitle}>Flexural:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.2,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor: '#FFFF00',
                      borderWidth: 1,
                      alignContent: 'center',
                      marginRight: 55,
                    }}
                    onPress={() => {}}>
                    <Text style={[styles.cell, {color: '#FFFF00'}]}>
                      {selectedItem.flexural}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                  <Text style={styles.cellTitle}>Residual:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.2,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor: '#FFFF00',
                      borderWidth: 1,
                      alignContent: 'center',
                      marginRight: 55,
                    }}
                    onPress={() => {}}>
                    <Text style={[styles.cell, {color: '#FFFF00'}]}>
                      {selectedItem.residual}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                  <Text style={styles.cellTitle}>ucs7Days:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.2,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor: '#FFFF00',
                      borderWidth: 1,
                      alignContent: 'center',
                      marginRight: 55,
                    }}
                    onPress={() => {}}>
                    <Text style={[styles.cell, {color: '#FFFF00'}]}>
                      {selectedItem.ucs7Days}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                  <Text style={styles.cellTitle}>ucs28Days:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.2,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor: '#FFFF00',
                      borderWidth: 1,
                      alignContent: 'center',
                      marginRight: 55,
                    }}
                    onPress={() => {}}>
                    <Text style={[styles.cell, {color: '#FFFF00'}]}>
                      {selectedItem.ucs28Days}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>omc</Text>
                  <Text style={styles.cell}>{selectedItem.omc}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>mdd</Text>
                  <Text style={styles.cell}>{selectedItem.mdd}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>pmuPendency</Text>
                  <Text style={styles.cell}>{selectedItem.pmuPendency}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>piuPendency</Text>
                  <Text style={styles.cell}>{selectedItem.piuPendency}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>status Pmu:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.7,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor:
                        selectedItem.statusPmu === 'Recommended'
                          ? '#00D25B'
                          : '#F8AB00',
                      borderWidth: 2,
                      alignContent: 'center',
                    }}
                    onPress={() => {}}>
                    <Text
                      style={[
                        styles.cell,
                        {
                          color:
                            selectedItem.statusPmu === 'Recommended'
                              ? '#00D25B'
                              : '#F8AB00',
                        },
                      ]}>
                      {selectedItem.statusPmu}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cellTitle}>status Piu:</Text>
                  <TouchableOpacity
                    style={{
                      flex: 0.7,
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderColor:
                        selectedItem.statusPiu === 'Recommended'
                          ? '#00D25B'
                          : '#F8AB00',
                      borderWidth: 2,
                      alignContent: 'center',
                    }}
                    onPress={() => {}}>
                    <Text
                      style={[
                        styles.cell,
                        {
                          color:
                            selectedItem.statusPiu === 'Recommended'
                              ? '#00D25B'
                              : '#F8AB00',
                        },
                      ]}>
                      {selectedItem.statusPiu}
                    </Text>
                  </TouchableOpacity>
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
