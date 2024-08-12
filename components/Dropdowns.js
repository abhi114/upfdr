import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import DrawerContent from './Helpers/DrawerContent';
import {useNavigation} from '@react-navigation/native';
import Header from './Headers/HeaderComponent';


const Dropdowns = ({showTab,showProfileTab,setShowTab,setShowProfileTab}) => {
    const navigation = useNavigation();
    const [tabPosition, setTabPosition] = useState(new Animated.Value(300));
    const [profileTabPosition, setProfileTabPosition] = useState(
      new Animated.Value(0),
    );
    const logout = () => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Register'}],
      });
    };
    const profilePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dy: profileTabPosition,
        },
      ]),
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > 100) {
          //setShowProfileTab(false);
          Animated.timing(profileTabPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else if (gesture.dy < -100) {
          Animated.timing(profileTabPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(profileTabPosition, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    });
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: tabPosition,
        },
      ]),
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

    const handleTabPress = () => {
      if (showProfileTab === true) {
        setShowProfileTab(!showProfileTab);
      }
      setShowTab(!showTab);
      //setAnimateTab(true);
      if (showTab) {
        console.log('hit design');
        Animated.spring(tabPosition, {
          toValue: 300,
          stiffness: 100,
          duration: 100,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start(() => {
          //setAnimateTab(false);
          //setShowTab(!showTab);
        });
      } else {
        console.log('hitting this spot');
        Animated.spring(tabPosition, {
          toValue: 0,
          stiffness: 100,
          duration: 100,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start(() => {
          //setAnimateTab(false);
        });
      }
    };
    const handleOutsideTabPress = () => {
      if (showTab) {
        setShowTab(false);
        Animated.timing(tabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      if (showProfileTab) {
        setShowProfileTab(false);
        Animated.timing(profileTabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    };
    const handleProfilePress = () => {
      if (showTab === true) {
        setShowTab(false);
      }
      setShowProfileTab(!showProfileTab);
      if (showProfileTab) {
        Animated.timing(profileTabPosition, {
          toValue: -300,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(profileTabPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    };
    const getTabStyles = () => {
      return {
        position: 'absolute',
        top: '10%',
        right: 0,
        bottom: 0,
        width: '60%',    
        height:100,    
        backgroundColor: '#282C34',
        padding: 16,
        transform: [{translateX: tabPosition}],
        //opacity: animateTab ? 0 : 1,
        zIndex:1
      };
    };
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>UTTAM-FDR</Text>
        <Header
          handleProfilePress={handleProfilePress}
          handleTabPress={handleTabPress}
        />
      </View>
      <View style={styles.tab}>
        {showTab && (
          <Animated.View style={getTabStyles()} {...panResponder.panHandlers}>
            <DrawerContent />
          </Animated.View>
        )}
        {showProfileTab && (
          <Animated.View
            style={[
              styles.profileTab,
              {
                transform: [{translateY: profileTabPosition}],
              },
            ]}
            {...profilePanResponder.panHandlers}>
            {/* Profile tab content here */}
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20}}>
              Profile
            </Text>
            <View
              style={{
                height: 1, // thickness of the line
                width: '100%', // width of the line
                backgroundColor: '#ccc',
              }}
            />

            <TouchableOpacity style={{flexDirection: 'column', marginTop: 10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#000000',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10, // add space between the image and the text
                  }}>
                  <Icon3 name="settings-outline" size={20} color={'#FFFF00'} />
                </View>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Reset Password
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 8,
                height: 1, // thickness of the line
                width: '100%', // width of the line
                backgroundColor: '#ccc',
              }}
            />
            <TouchableOpacity
              style={{flexDirection: 'column', marginTop: 10}}
              onPress={logout}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#000000',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10, // add space between the image and the text
                  }}>
                  <Icon name="logout" size={20} color={'#FF0000'} />
                </View>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  profileTab: {
    position: 'absolute',
    top: '9%',
    left: '10%',
    right: 50,
    height: 200,
    backgroundColor: '#282C34',
    borderRadius: 10,
    padding: 15,
    zIndex:1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#191C24',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tabIcon: {
    marginTop: 5,
    width: 32,
    height: 32,
  },
  content: {
    marginVertical: 20,
    padding: 20,
  },
  card: {
    marginVertical: 5,
    backgroundColor: '#191C24',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 12,
    color: '#6C554F',
  },
  tab: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#282C34',
    padding: 16,
  },
  logo: {
    marginTop: 2,
    marginHorizontal: 15,
    width: 32,
    height: 32,
    borderRadius: 80,
  },
});

export default Dropdowns;
