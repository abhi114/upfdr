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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import DrawerContent from './Helpers/DrawerContent';
import { useNavigation } from '@react-navigation/native';
import DrawerTab from './Headers/DrawerTab';
import ProfileTab from './Headers/ProfileTab';
import Header from './Headers/HeaderComponent';
const Card = ({index,title, number, text, iconName,color,screenName,setScreenName}) => {
  const navigation = useNavigation();
  const CardPress = ()=>{
    if (index === 0) {
      navigation.navigate('HeaderMain', {index,screenName,setScreenName});
    } else if (index === 1 || index === 3) {
      navigation.navigate('HeaderMain', {index: 1, screenName, setScreenName});
    } else if (index === 2) {
      navigation.navigate('HeaderMain', {index, screenName, setScreenName});
    } else if (index === 4) {
      navigation.navigate('HeaderMain', {index, screenName, setScreenName});
    }
  }
  return (
    <TouchableOpacity style={styles.card} onPress={CardPress}>
      <View style={{flexDirection: 'row',justifyContent:'space-evenly',alignItems:'center',}}>
        <View style={{width:'52%',}}>
          <Text style={styles.cardTitle}>{title}</Text>
          {number && (<Text style={styles.cardNumber}>{number}</Text>)}
          <Text style={styles.cardText}>{text}</Text>
        </View>
        <Icon name={iconName} size={65} color={`${color}`} />
      </View>
    </TouchableOpacity>
  );      
};
const Home = () => {
  const [showTab, setShowTab] = useState(false);
  const [screenName, setScreenName] = useState();
  const [tabPosition, setTabPosition] = useState(new Animated.Value(300));
  const [showProfileTab, setShowProfileTab] = useState(false);
  const [profileTabPosition, setProfileTabPosition] = useState(
    new Animated.Value(300),
  );
 
const navigation = useNavigation();
const [cardsData] = useState([
  {
    title: 'Count of Road Projects',
    number: 680,
    text: 'Total Number of Road Projects in FDR',
    iconName: 'cube-outline',
    color: `#0090E7`,
  },
  {
    title: 'Count of Contractors',
    number: 81,
    text: 'Number of Contractors Registered on the Projects ',
    iconName: 'briefcase-outline',
    color: `#FC424A`,
  },
  {
    title: 'Count of PIUs',
    number: 60,
    text: 'Number of PIUs Registered on the Projects',
    iconName: 'monitor',
    color: `#00D25B`,
  },
  {
    title: 'Roads Assigned',
    number: 680,
    text: 'Number of Road Projects Assigned to Contractors',
    iconName: 'account',
    color: `#0090E7`,
  },
  {
    title: 'Number of Lab Details',
    number: 685,
    text: 'Number of Lab Details Updated',
    iconName: 'note-text-outline',
    color: `#FFAB00`,
  },
  {
    title: 'Joint Surveys',
    number: 592,
    text: 'Number of Roads on which Joint Surveys Uploaded',
    iconName: 'note-text-outline',
    color: `#FFAB00`,
  },
  {
    title: 'Site Management Plan',
    number: 685,
    text: 'Number of Site Management Plan Uploaded',
    iconName: 'note-text-outline',
    color: `#FFAB00`,
  },
  {
    title: 'Trail of Equipments',
    number: 686,
    text: 'Number of Roads on which Some Equipments Updated',
    iconName: 'anchor',
    color: `#90EE90`,
  },
  {
    title: 'Sample Collection',
    number: 686,
    text: 'Number of Samples Collected on Sites',
    iconName: 'check-all',
    color: `#FFA500`,
  },
  {
    title: 'Job Mix Design',
    number: 685,
    text: 'Number of Job Mix Design Reports Updated',
    iconName: 'note-text-outline',
    color: `#0090E7`,
  },
  {
    title: 'Trial Stretch',
    number: 675,
    text: 'Number of Trial Stretch Details Updated',
    iconName: 'note-text-outline',
    color: `#0090E7`,
  },
  {
    title: 'Number of Bills Raised',
    number: 1818,
    text: 'Number of Bills Raised by Contractors',
    iconName: 'note-text-outline',
    color: `#00D25B`,
  },
  {
    title: 'Bills: Processed | Pending | Rejected',
    number: `811 | 803 | 204`,
    text: 'No. of Bills Processed | No. of Bills Pending | No. of Bills Rejected',
    iconName: 'note-text-outline',
    color: `#FC424A`,
  },
  {
    title: 'Daily Work Progress',
    text: 'Daily Work Progress List',
    iconName: 'note-text-outline',
    color: `#FC424A`,
  },
  {
    title: 'Roads Completed',
    number: `86`,
    text: 'Number Of Roads Completed',
    iconName: 'check-all',
    color: `#FFA500`,
  },
]);

  
  const handleTabPress = () => {
    if (showProfileTab === true) {
      setShowProfileTab(!showProfileTab);
    }
    setShowTab(!showTab);
    //setAnimateTab(true);
    if (showTab) {
      console.log("hit design")
      Animated.spring(tabPosition, {
        toValue: 300,
        stiffness: 100,
        duration:100,
        damping: 20,
        mass: 1,
        useNativeDriver: true,
      }).start(() => {
        //setAnimateTab(false);
        //setShowTab(!showTab);
      });
    } else {
      console.log("hitting this spot");
      Animated.spring(tabPosition, {
        toValue:0,
        stiffness: 100,
        duration:100,
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
  const handleProfilePress = ()=>{
    if(showTab === true){
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
  }
  const handleCardPress = index => {
    console.log(`Card at index ${index} was pressed`);
    // Do something with the index, e.g. navigate to a details screen
  };
  return (
    <TouchableWithoutFeedback onPress={handleOutsideTabPress}>
      <View style={styles.container}>
        <Header
          handleProfilePress={handleProfilePress}
          handleTabPress={handleTabPress}
        />
        <ScrollView style={styles.content}>
          {cardsData.map((card, index) => (
            <Card
              key={index}
              {...card}
              screenName={screenName}
              setScreenName={setScreenName}
              index={index}
              onPress={() => handleCardPress(index)}
            />
          ))}
        </ScrollView>
        {showTab && (
          <DrawerTab
            setShowTab={setShowTab}
            tabPosition={tabPosition}
            screenname={'Dashboard'}
            setScreenName={setScreenName}
          />
        )}
        {showProfileTab && (
          <ProfileTab
            profileTabPosition={profileTabPosition}
            setShowProfileTab={setShowProfileTab}
            screenname={'Dashboard'}
            setScreenName={setScreenName}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  profileTab: {
    position: 'absolute',
    top: '6%',
    left: '10%',
    right: 50,
    height: 200,
    backgroundColor: '#282C34',
    borderRadius:10,
    padding: 15,
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

export default Home;
