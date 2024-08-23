import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RoadDetailsCard = () => {
  const details = [
    {
      icon: 'document-outline',
      color: '#008FFF',
      title: 'Total Project Cost (with Higher Specs)',
      subtitle: 'Road Name',
      value: '920.94',
      extraInfo: 'MRL08-Shahgarh chilbili to Bhatgawan road',
    },
    {
      icon: 'cloud-download-outline',
      color: '#00D877',
      title: 'District',
      subtitle: 'Block',
      value: 'Amethi',
      extraInfo: 'Shahgarh',
    },
    {
      icon: 'calendar-outline',
      color: '#A500FF',
      title: 'Sanctioned Year',
      subtitle: 'IMS Batch',
      value: '2021-2022',
      extraInfo: '2.00',
    },
    {
      icon: 'mail-open-outline',
      color: '#FF5151',
      title: 'Total Length',
      subtitle: 'Sanctioned Pavement Amount',
      value: '8.63',
      extraInfo: '821.92',
    },
    {
      icon: 'reader-outline',
      color: '#FFA000',
      title: 'Carriage Width',
      subtitle: 'Traffic Name',
      value: '5.5',
      extraInfo: 'T5',
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.header}>
        Road Details - UP7568 | FDR Group - UPFDR-62
      </Text>
      {details.map((item, index) => (
        <View key={index} style={styles.row}>
          <Icon name={item.icon} size={22} color={item.color} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.extraInfo}>{item.extraInfo}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#191C24',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  header: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
  },
  textContainer: {
    flex: 2,
    marginLeft: 5,
  },
  title: {
    fontSize: 13,
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    color: '#7F7F7F',
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 13,
    color: '#526B93',
    fontWeight: 'bold',
  },
  extraInfo: {
    fontSize: 10,
    color: '#7F7F7F',
  },
});

export default RoadDetailsCard;
