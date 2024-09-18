import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const WelcomeAnimation = ({navigation}) => {
  useEffect(() => {
    // Navigate to the dashboard after the animation finishes
    const timeout = setTimeout(() => {
      navigation.replace('Home'); // Replace with your dashboard screen name
    }, 3000); // Adjust time as per your animation duration

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../Helpers/welcome1.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        style={styles.lottieAnimation}
        onAnimationFinish={() => navigation.replace('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  lottieAnimation: {
    width: Dimensions.get('window').width - 200, // Use window dimensions for the best fit
    height: Dimensions.get('window').height -200,
  },
});

export default WelcomeAnimation;
