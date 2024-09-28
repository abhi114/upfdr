import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Adjust based on your icon library

const PdfCard = ({pdfUrl}) => {
    const url = 'https://www.pdf995.com/samples/pdf.pdf';
  const openPdf = () => {
    // Tries to open the PDF using external apps installed on the phone (like WPS)
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('No PDF viewer found.');
        }
      })
      .catch(err => console.error('Error opening PDF', err));
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openPdf}>
      <Image
        source={require('./pdfimage.png')} // Dummy image
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Open PDF Report</Text>
        <Text style={styles.cardSubtitle}>
          Click to open the PDF in an external viewer
        </Text>
        <Icon name="arrow-up-right" size={20} color="#28a745" />
      </View>
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#191C24',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight:10
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#b0b0b0',
    fontSize: 12,
    marginTop: 5,
  },
});

export default PdfCard;
