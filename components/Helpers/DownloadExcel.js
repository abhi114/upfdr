import { View, Text } from 'react-native'
import React from 'react'
import XLSX from 'xlsx';
var RNFS = require('react-native-fs');
import { data } from '../data';

const DownloadExcel =async () => {
  // Created Sample data
  let sample_data_to_export = data;

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
  XLSX.utils.book_append_sheet(wb, ws, 'Users');
  console.log(
    ' main path is ' + RNFS.DownloadDirectoryPath + '/FDRROADLIST.xlsx',
  );
  // Write workbook to an array buffer
  const wbout = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});

  // Convert array buffer to binary string
  const binaryStr = new Uint8Array(wbout).reduce((data, byte) => {
    return data + String.fromCharCode(byte);
  }, '');

  // Write generated excel to Storage
  RNFS.writeFile(
    RNFS.DownloadDirectoryPath + '/FDRROADLIST.xlsx',
    binaryStr,
    'ascii',
  )
    .then(() => {
      console.log('success');
    })
    .catch(e => {
      console.log('Error', e);
    });
}

export default DownloadExcel