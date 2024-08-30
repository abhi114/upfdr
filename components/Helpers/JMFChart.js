import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const JMFChart = ({data}) => {
  const navigation = useNavigation();

  

  const handlePress = index => {
    // Implement navigation logic based on index
    if (index === 0) {
      console.log(0);
    } else if (index === 1) {
      console.log(1)
    }
  };

  return (
    <View>
      <PieChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#191C24',
          backgroundGradientFrom: '#191C24',
          backgroundGradientTo: '#191C24',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[50, 0]}
        hasLegend={false}
        avoidFalseZero={true}
        onPress={index => handlePress(index)}
      />
     
      <View>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }} onPress={()=>{console.log(index)}}>
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                color: item.color,
                fontSize: item.legendFontSize,
              }}>
              {item.name} - {item.population}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default JMFChart;
