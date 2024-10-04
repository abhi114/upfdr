import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Feather'; // Adjust based on your icon library

import PdfCard from './Helpers/Pdf';

const SCKmPhoto = ({selectedItem}) => {
  // First set of data (from the first image)
  const dataMapping1 = [
    {key: 'Date of Reporting', icon: 'calendar', color: '#007bff'}, // Blue
    {key: 'Package No.', icon: 'file-text', color: '#007bff'}, // Blue
    {key: 'Institution', icon: 'university', color: '#28a745'}, // Green
    {key: 'Cement Content', icon: 'building', color: '#ff9800'}, // Orange
    {key: 'Optimum Moisture', icon: 'tint', color: '#9c27b0'}, // Purple
    {key: 'Maximum Dry Density (MDD)', icon: 'balance-scale', color: '#9c27b0'}, // Purple
    {
      key: 'Unconfined Compression Strength - 7 Days',
      icon: 'bolt',
      color: '#f44336',
    }, // Red
    {
      key: 'Unconfined Compression Strength - 28 Days',
      icon: 'bolt',
      color: '#f44336',
    }, // Red
  ];

  // Second set of data (from the second image)
  const dataMapping2 = [
    {key: 'Flexural Strength', icon: 'cloud', color: '#28a745'}, // Green
    {key: 'Residual Strength', icon: 'cloud', color: '#28a745'}, // Green
    {key: 'Durability', icon: 'shield', color: '#9c27b0'}, // Purple
    {key: 'Additive Name', icon: 'flask', color: '#9c27b0'}, // Purple
    {key: 'Additive Type', icon: 'flask', color: '#f44336'}, // Red
    {key: 'IRC Accredited', icon: 'check-circle', color: '#f44336'}, // Red
    {key: 'Required Quantity', icon: 'tint', color: '#ff9800'}, // Orange
    {key: 'Remarks', icon: 'comment', color: '#ff9800'}, // Orange
  ];
  const cardData = [
    {
      header: 'PMU Comment',
      date: '2022-12-24 04:17:46',
      comment:
        'This JMF is recommended for construction of trial patch and with the condition: 1. All the values must be achieved 2. Final clearance and the permission for construction of the main carriageway will be granted after checking all the satisfactory results from the trial patch.',
      status: 'Recommended',
    },
    {
      header: 'PIU Comment',
      date: '2022-12-27 12:08:25',
      comment:
        'All the conditions given by PMU is must be followed strictly during trial patch and construction of entire Road and maintained all machineries and equipments before trial patch.',
      status: 'Recommended',
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
          }}>
          Mix Design Details - 29
        </Text>
        {dataMapping1.map(({key, icon, color}) => {
          const value = selectedItem['MixDesignData'][key];
          if (value) {
            return (
              <View style={styles.card} key={key}>
                <View style={styles.row}>
                  <Icon
                    name={icon}
                    size={20}
                    color={color}
                    style={{marginRight: 10}}
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
      <View style={styles.cardContainer}>
        <Text
          style={{
            color: '#ffffff',
            alignSelf: 'center',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Mix Design Details - 29
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
                    style={{marginRight: 10}}
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
      <View style={styles.touchableContainer}>
        <TouchableOpacity
          style={styles.touchableCard}
          onPress={() => {
            /* Download Mix Design Logic */
          }}>
          <View style={styles.touchableCardContent}>
            <View>
              <Text style={styles.touchableCardTitle}>
                Download Mix Design Report
              </Text>
              <Text style={styles.touchableCardSubtitle}>
                Download Mix Design (Job Mix Formula) PDF Report
              </Text>
            </View>
            <Icon1 name="arrow-up-right" size={20} color="#28a745" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableCard}
          onPress={() => {
            /* Back to Road Details Page Logic */
          }}>
          <View style={styles.touchableCardContent}>
            <View>
              <Text style={styles.touchableCardTitle}>
                Back to Road Details Page
              </Text>
              <Text style={styles.touchableCardSubtitle}>
                Go Back to Road Details Page
              </Text>
            </View>
            <Icon1 name="arrow-up-right" size={20} color="#28a745" />
          </View>
        </TouchableOpacity>
      </View>

      <PdfCard />
      <View style={styles1.cardContainer}>
        {cardData.map((card, index) => (
          <View key={index} style={styles1.card}>
            <Text style={styles1.headerText}>{card.header}</Text>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Date</Text>
              <Text style={styles1.cell}>{card.date}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Comment</Text>
              <Text style={styles1.cell}>{card.comment}</Text>
            </View>
            <View style={styles1.row}>
              <Text style={styles1.cellTitle}>Status</Text>
              <Text style={{color: '#FFFF00', fontSize: 13, flex: 2}}>
                {card.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
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
    padding: 10,
    marginVertical: 5,
    width: '48%', // Two cards per row
    elevation: 2,
    minHeight: 100, // Reducing the height
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
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
