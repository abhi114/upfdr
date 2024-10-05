import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const tableData = [
  {
    'Sl. No.': 1,
    District: 'Shrawasti',
    'Package Number': 'UP6475',
    'FDR Group': 'UPFDR-172',
    Contractor: 'RAHAT ALI',
    Comment:
      'I WANT TO START FDR MAIN CERRIAGWAY WORK DATE 20/03/2023 FDR/172 PKG NO UP6475 NSLH TO KALYANPUR RAHAT ALI CONTRACTOR DISTRICT SHARWASTI ALL MACHINERY & 3CEMENT BULKER REACHED IN SITE BEFORE 7 DAYS',
    File: 'Download',
  },
  {
    'Sl. No.': 2,
    District: 'Shrawasti',
    'Package Number': 'UP6475',
    'FDR Group': 'UPFDR-172',
    Contractor: 'RAHAT ALI',
    Comment:
      'I WANT TO START FDR MAIN CERRIAGWAY WORK DATE 20/03/2023 FDR/172 PKG NO UP6475 NSLH TO KALYANPUR RAHAT ALI CONTRACTOR DISTRICT SHARWASTI ALL MACHINERY & 3CEMENT BULKER REACHED IN SITE BEFORE 7 DAYS',
    File: 'Download',
  },
  {
    'Sl. No.': 3,
    District: 'Shrawasti',
    'Package Number': 'UP6475',
    'FDR Group': 'UPFDR-172',
    Contractor: 'RAHAT ALI',
    Comment:
      'I WANT TO START FDR MAIN CERRIAGWAY WORK DATE 20/03/2023 FDR/172 PKG NO UP6475 NSLH TO KALYANPUR RAHAT ALI CONTRACTOR DISTRICT SHARWASTI ALL MACHINERY & 3CEMENT BULKER REACHED IN SITE BEFORE 7 DAYS',
    File: 'Download',
  },
];

const IconTextItem = ({iconName, text1, text2, style}) => (
  <View style={styles.iconTextContainer}>
    <Icon name={iconName} size={20} color="#FFF" style={styles.icon} />
    <Text style={[styles.text, style]}>{text1}</Text>
    <Text style={{color: '#FFFFFF',fontSize:12}}>{text2}</Text>
  </View>
);
const DownloadPress = (item)=>{
    console.log(item['Sl. No.']);
    alert("Pdf Downloaded")
}
const CardItem = ({item}) => (
  <View style={styles.card}>
    <Text style={styles.title}>Sl. No. {item['Sl. No.']}</Text>
    <IconTextItem
      iconName="map-marker"
      text1={`District: `}
      text2={`${item.District}`}
    />
    <IconTextItem
      iconName="package-variant"
      text1={`Package Number: `}
      text2={`${item['Package Number']}`}
    />
    <IconTextItem
      iconName="account-group"
      text1={`FDR Group: `}
      text2={`${item['FDR Group']}`}
    />
    <View style={{borderBottomWidth: 1, borderBottomColor: '#444444'}}>
      <IconTextItem
        iconName="account-hard-hat"
        text1={`Contractor: `}
        text2={`${item.Contractor}`}
      />
    </View>
    <View style={{borderBottomWidth: 1, borderBottomColor: '#444444',marginBottom:5}}>
      <IconTextItem
        iconName="comment-text"
        text1={`Comment: `}
        text2={`${item.Comment}`}
      />
    </View>
    <TouchableOpacity
      onPress={() => {
        DownloadPress(item);
      }}>
      <IconTextItem
        iconName="file-download"
        text1={`File: ${item.File}`}
        style={styles.file}
      />
    </TouchableOpacity>
  </View>
);

const EnhancedDarkThemeFlatList = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <FlatList
      data={tableData}
      renderItem={({item}) => <CardItem item={item} />}
      keyExtractor={item => item['Sl. No.'].toString()}
      contentContainerStyle={styles.listContainer}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#191C24',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    
  },
  title: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#F0F0F0',
    fontSize: 16,
    flex: 1,
  },
  comment: {
    color: '#E0E0E0',
    fontStyle: 'italic',
  },
  file: {
    color: '#64B5F6',
    fontWeight: 'bold',
  },
});

export default EnhancedDarkThemeFlatList;
