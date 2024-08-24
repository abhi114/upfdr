import { View, Text, Animated, PanResponder } from 'react-native'
import React from 'react'
import DrawerContent from '../Helpers/DrawerContent';

const DrawerTab = ({setShowTab, tabPosition, screenname, setScreenName}) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: tabPosition,
      },
    ]),
    //wtf is this shit
    onPanResponderRelease: (event, gesture) => {
      // Prevent dragging left beyond half of the screen width
      if (gesture.dx > 100) {
        console.log('going');
        Animated.timing(tabPosition, {
          toValue: 300,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          console.log('hit here');
          setShowTab(false);
        });
      } else if (gesture.dx < -100 && gesture.dx >= -200) {
        // Adjusted condition
        //console.log("HIT HERE ALSO")
        setShowTab(true);
        Animated.timing(tabPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(tabPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  const getTabStyles = () => {
    return {
      position: 'absolute',
      top: '9%',
      right: 0,
      bottom: 0,
      width: '60%',
      backgroundColor: '#282C34',
      padding: 16,
      transform: [{translateX: tabPosition}],
      //opacity: animateTab ? 0 : 1,
    };
  };
  return (
    <Animated.View style={getTabStyles()} {...panResponder.panHandlers}>
      <DrawerContent screenname={screenname} setScreenName={setScreenName} />
    </Animated.View>
  );
};

export default DrawerTab