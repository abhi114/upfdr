import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const JMFChart = ({data}) => {
  const navigation = useNavigation();

  

  const handleNavigatePress = (id)=>{
    console.log(id);
    if (id === 'JMFs Recommended by PMU List') {
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Recommended by PMU List',
        dataName: 'JMFRecommendedPMUList',
      });
    } else if (id === 'JMFs Not Recommended by PMU List') {
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Not Recommended by PMU List',
        dataName: 'JMFNotRecommendedPMUList',
      });
    } else if (id === 'JMFs Pending Action by PMU List') {
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Pending Action by PMU List',
        dataName: 'JMFPendingPMUList',
      });
    } else if (id === 'JMFs Approved by PIU List') {
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Approved by PIU List',
        dataName: 'JMFApprovedPIUList',
      });
    } else if (id === 'JMFs Returned by PIU List') {
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Returned by PIU List',
        dataName: 'JMFReturnedPIUList',
      });
    } else if (id === 'JMFs Pending Action by PIU') {
      navigation.navigate('JMFRecommendedPMU', {
        name: 'JMFs Pending Action by PIU',
        dataName: 'JMFPendingActionPIU',
      });
    }else if(id === 'Trial Stretch List'){
       navigation.navigate('TrialStrechListed', {
         name: 'Trial Stretch List',
         dataName: 'TrialStretchList',
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
