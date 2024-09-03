import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const JMFChart = ({data}) => {
  const navigation = useNavigation();

  

  const handleNavigatePress = (id)=>{
    console.log(id);
    if(id === 'JMFs Recommended by PMU List'){
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Recommended by PMU List',
        dataName: 'JMFRecommendedPMUList',
      });
    }
  }
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
       
      />

      <View>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              marginVertical: 5,
            }}
            onPress={() => {
              handleNavigatePress(item.id);
            }}>
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: item.color,
                marginRight: 8,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: item.color,
                  fontSize: item.legendFontSize,
                }}>
                {item.name} - {item.population}
              </Text>
              <Text
                style={{
                  color: item.color,
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginHorizontal: 10,
                }}>
                ↗
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default JMFChart;
