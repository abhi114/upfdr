import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather'; // Adjust based on your icon library

import PdfCard from './Helpers/Pdf';

const SCKmPhoto = ({selectedItem}) => {
  // First set of data (from the first image)
  const [photoModal,setphotoModal] = useState(false);
  const [photoUrl,setPhotoUrl] = useState(null);
  const dataMapping1 = [
    {key: 'Contractor', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Phone Number', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Total Length', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Road Name', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'District', icon: 'cloud', color: '#28a745'}, // Green
    {key: 'Block', icon: 'cloud', color: '#28a745'}, // Green
  ];

  // Second set of data (from the second image)
  const dataMapping2 = [
    {key: 'Date of Sample Collection', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Date of Upload', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Date Sent to Lab', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Lab Name', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'No. of JMF Needed', icon: 'cloud', color: '#28a745'}, // Green
    {key: 'Remarks', icon: 'cloud', color: '#28a745'}, // Green
  ];
  const photoPress = (card)=>{
    setphotoModal(true);
    setPhotoUrl(card.PhotoUrl);
  }
  const cardData = [
    {
      header: 'Information',
      slNo: '1',
      Chainage: '0.500',
      Side: 'L',
      CrustThickness: '0.36',
      status: 'Recommended',
      PhotoUrl: './Helpers/check2.jpeg',
    },
    {
      header: 'Information',
      slNo: '2',
      Chainage: '0.700',
      Side: 'C',
      CrustThickness: '0.55',
      status: 'Recommended',
      PhotoUrl: './Helpers/check2.jpeg',
    },
  ];
  return (
    <View style={{flex: 1, padding: 5}}>
      {/* First and Second Card Views */}
      <View style={styles.cardContainer}>
        <Text
          style={{
            color: '#ffffff',
            alignSelf: 'center',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
            marginHorizontal: 10,
          }}>
          Road Profile - UP3574 | FDR Group-UPFDR-130
        </Text>
        {dataMapping1.map(({key, icon, color}) => {
          const value = selectedItem['MixDesignData'][key];
          if (value) {
            return (
              <View style={styles.card} key={key}>
                <View style={styles.row}>
                  <Icon name={icon} size={20} color={color} />
                  <View style={styles.textContainer}>
                    <Text style={styles.cellTitle}>{key}</Text>
                    <Text style={styles.cell}>{value}</Text>
                  </View>
                </View>
              </View>
            );
          }
          return null;
        })}
      </View>
      <View style={styles.cardContainer}>
        <Text
          style={{
            color: '#ffffff',
            alignSelf: 'center',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
            marginHorizontal: 10,
          }}>
          Sample Collection Data
        </Text>
        {dataMapping2.map(({key, icon, color}) => {
          const value = selectedItem['MixDesignData'][key];
          if (value) {
            return (
              <View style={styles.card} key={key}>
                <View style={styles.row}>
                  <Icon
                    name={icon}
                    size={20}
                    color={color}
                    style={{marginRight: 1}}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.cellTitle}>{key}</Text>
                    <Text style={styles.cell}>{value}</Text>
                  </View>
                </View>
              </View>
            );
          }
          return null;
        })}
      </View>

      <Text
        style={{
          color: '#ffffff',
          alignSelf: 'center',
          marginVertical: 20,
          fontSize: 20,
          fontWeight: 'bold',
          marginHorizontal: 10,
        }}>
        Sample Collection(km-wise)
      </Text>
      <View style={styles1.cardContainer}>
        {cardData.map((card, index) => (
          <View key={index} style={styles1.card}>
            <Text style={styles1.headerText}>{card.header}</Text>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>SlNo/Km</Text>
              <Text style={styles1.cell}>{card.slNo}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Chainage</Text>
              <Text style={styles1.cell}>{card.Chainage}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Side</Text>
              <Text style={styles1.cell}>{card.Side}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Crust Thickness</Text>
              <Text style={styles1.cell}>{card.CrustThickness}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
                alignSelf: 'center',
              }}>
              <Text style={styles1.cellTitle}>Photo</Text>
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  flex: 2,
                }}
                onPress={() => {
                  photoPress(card);
                }}>
                <Image
                  source={require('./Helpers/check3.jpeg')} //change it to uri when the image starts coming from the remote url 
                  style={{
                    width: 50,
                    height: 50,
                    flex: 2,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Geo-Location</Text>
              <Text style={{color: '#FFFF00', fontSize: 13, flex: 2}}>
                {card.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
      {photoUrl && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={photoModal}
          onRequestClose={() => setphotoModal(!photoModal)}>
          <View
            style={{
              flex: 1,

              alignContent: 'center',
              margin: 5,
              backgroundColor: '#000000',
            }}>
            <Image
              source={require('./Helpers/check3.jpeg')}
              resizeMode="contain"
              style={{
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height,
              }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles1 = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column', // Ensure cards are stacked vertically
    justifyContent: 'space-between',
    backgroundColor: '#191C24',
    marginVertical: 8,
    borderRadius: 5,
  },
  headerText: {
    color: '#ffffff',
    alignSelf: 'center',
    marginVertical: 20,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#242730',
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    elevation: 2,
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  cellTitle: {
    color: '#F1F1F1',
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1, // Ensure equal width for labels
  },
  cell: {
    color: '#B0B0B0',
    fontSize: 13,
    flex: 2, // Ensure more space for values
  },
});
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap into the next row
    justifyContent: 'space-between', // Space between the two cards
    backgroundColor: '#191C24',
    marginVertical: 5,
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#242730',
    borderRadius: 10,
    padding: 12,
    marginVertical: 5,
    width: '49%', // Two cards per row
    elevation: 2,
    minHeight: 100, // Reducing the height
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  textContainer: {
    flexDirection: 'column',
    padding:5,
    justifyContent:'center'
  },
  cellTitle: {
    color: '#F1F1F1',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cell: {
    color: '#B0B0B0',
    fontSize: 12,
    
  },
  touchableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 10,
  },
  touchableCard: {
    flex: 1,
    backgroundColor: '#191C24',
    margin: 4,
    padding: 20,
    borderRadius: 10,
  },
  touchableCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchableCardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  touchableCardSubtitle: {
    color: '#b0b0b0',
    fontSize: 12,
    marginTop: 5,
  },
});

export default SCKmPhoto;
