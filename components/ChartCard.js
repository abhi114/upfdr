import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ChartCard = () => {
  const data = [
    {
      name: 'Pavement Cost',
      cost: 95.3,
      color: '#00D25B',
      legendFontColor: '#00D25B',
      legendFontSize: 11,
    },
    {
      name: 'Average Cost',
      cost: 106.78,
      color: '#FFAB00',
      legendFontColor: '#FFAB00',
      legendFontSize: 11,
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.header}>Chart</Text>
      <PieChart
        data={data.map(item => ({
          name: item.name,
          cost: item.cost,
          color: item.color,
          legendFontColor: item.legendFontColor,
          legendFontSize: item.legendFontSize,
        }))}
        width={screenWidth * 0.9}
        height={140}
        chartConfig={{
          color: () => `rgba(255, 255, 255, 1)`,
        }}
        accessor={'cost'}
        backgroundColor={'transparent'}
        paddingLeft={'5'}
        center={[10, 0]}
        absolute
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          PAVEMENT COST {'\n'}{' '}
          <Text style={{color: '#526B93'}}>per KM in Lakhs INR</Text>
        </Text>
        <Text style={styles.cost}>95.3L INR</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          AVERAGE COST {'\n'}{' '}
          <Text style={{color: '#526B93'}}>per KM in Lakhs INR</Text>
        </Text>
        <Text style={styles.cost}>106.78L INR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#191C24',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#12151E',
    borderRadius: 10,
  },
  detail: {
    color: 'white',
    fontSize: 12,
  },
  cost: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChartCard;
