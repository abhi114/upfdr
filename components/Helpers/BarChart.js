import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {Dimensions, View, Text, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

const data = {
  labels: ['39', '40', '41', '42', '43', '44', '45','46'], // Week numbers
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50 ], // JMF Status Data
    },
    {
      data: [30, 55, 48, 90, 70, 60, 40 ], // TS Status Data
    },
  ],
};

const chartConfig = {
  backgroundColor: '#191C24',
  backgroundGradientFrom: '#191C24',
  backgroundGradientTo: '#191C24',
  decimalPlaces: 0, // no decimal in values
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White bars
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White text for labels
  propsForDots: {
    r: '2',
    strokeWidth: '1',
    stroke: '#ffa726',
  },
};

const BarChartComponent = () => {
  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.header}>JMF Status: Upload Per Week</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={data}
            width={screenWidth - 30} // Adjust width to fit inside the card
            height={200}
            chartConfig={chartConfig}
            fromZero={true}
            showValuesOnTopOfBars={true}
            verticalLabelRotation={28} // Rotate x-axis labels for better visibility
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.header}>TS Status: Upload Per Week</Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={data}
            width={screenWidth - 30} // Adjust width to fit inside the card
            height={200}
            chartConfig={chartConfig}
            fromZero={true}
            showValuesOnTopOfBars={true}
            verticalLabelRotation={28} // Rotate x-axis labels for better visibility
          />
        </View>
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
    alignItems: 'center', // Aligns children (text and chart) to the center horizontally
  },
  header: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center', // Center the header text
  },
  chartContainer: {
    alignItems: 'center', // Center the chart inside the container
    justifyContent: 'center',
    marginRight:10,
    width: '70%', // Ensures the chart takes the full width available in the card
    
  },
});

export default BarChartComponent;
