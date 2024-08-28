import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DrawerItems = ({
  name,
  icon,
  IconColor,
  backgroundColor,
  isDropable,
  subItems,
  onSubItemPress,
  expandedItem,
  setExpandedItem,
  setScreenName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => {
    if (isDropable) {
      if (expandedItem === name) {
        setExpandedItem(null);
      } else {
        setExpandedItem(name);
      }
    } else {
      console.log(name);
      if (name === 'Dashboard') {
        navigation.navigate('Home');
      } else if (name === 'UPFDR Road List') {
        const index = 0;
        navigation.navigate('HeaderMain', {
          index,
          screenName: name,
          setScreenName,
        });
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 20,
        backgroundColor: backgroundColor,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          borderRadius: 20,
        }}
        onPress={handlePress}>
        <View style={{backgroundColor: ''}}>
          <Icon name={icon} size={25} color={IconColor} />
        </View>
        <Text style={{color: '#FFFFFF', marginLeft: 10, fontSize: 15}}>
          {name}
        </Text>
        {isDropable && (
          <Icon3
            name={expandedItem === name ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={20}
            color={'#F7F7F7'}
          />
        )}
      </TouchableOpacity>
      {expandedItem === name && (
        <View>
          <FlatList
            data={subItems}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  backgroundColor: item.backgroundColor,
                  borderRadius: 20,
                  marginLeft: 20,
                }}
                onPress={() => {
                  onSubItemPress(item.name); // Call the provided function to navigate
                }}>
                <Text style={{color: '#FFFFFF', marginLeft: 10, fontSize: 13}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const DrawerContent = ({screenname, setScreenName}) => {
  const [selectedScreen, setSelectedScreen] = useState(screenname);
  console.log(screenname)
  const [expandedItem, setExpandedItem] = useState(null);
  const navigation = useNavigation();
  //console.log(screenname);
  const handleSubItemPress = screenName => {
    setSelectedScreen(screenName);
    console.log('screen name is' + screenName);
    console.log('type of setScreen name is' + typeof setScreenName);
    if (screenName === 'List All Users') {
      setScreenName('UserManagement/ListUser');
      navigation.navigate('HeaderMain', {index: 1, screenName, setScreenName});
    } else if (screenName === 'List of PIUs') {
      setScreenName('Statistics/ListPIU');
      navigation.navigate('HeaderMain', {index: 2, screenName, setScreenName});
    }
    //setExpandedItem(null); // Close the dropdown after selection
  };

  const drawerItems = [
    {
      name: 'Dashboard',
      icon: 'speedometer',
      IconColor: '#815FE8',
      backgroundColor: screenname === 'Dashboard' ? '#0F1015' : null,
      isDropable: false,
      subItems: [],
    },
    {
      name: 'UPFDR Road List',
      icon: 'tag-outline',
      IconColor: '#FFAB00',
      backgroundColor: screenname === 'UPFDR Road List' ? '#0F1015' : null,
      isDropable: false,
      subItems: [],
    },
    {
      name: 'User Management',
      icon: 'laptop',
      IconColor: '#FC424A',

      isDropable: true,
      subItems: [
        {
          name: 'List All Users',
          screenName: 'ListAllUsersScreen',
          backgroundColor: screenname === 'List All Users' ? '#0F1015' : null,
        },
        {name: 'Map Contractor', screenName: 'MapContractorScreen'},
      ],
    },
    {
      name: 'SQM Visits',
      icon: 'home',
      IconColor: '#00C853',

      isDropable: true,
      subItems: [
        {name: 'For MCW Start Date', screenName: 'ListAllUsersScreen'},
        {name: 'For Core Testing', screenName: 'MapContractorScreen'},
      ],
    },
    {
      name: 'Statistics/Lists',
      icon: 'chart-line',
      IconColor: '#00A8FF',

      isDropable: true,
      subItems: [
        {name: 'List Contractors', screenName: ''},
        {name: 'List Mapped Contractors', screenName: ''},
        {
          name: 'List of PIUs',
          screenName: '',
          backgroundColor: screenname === 'List of PIUs' ? '#0F1015' : null,
        },
        {name: 'List of TS Requests', screenName: ''},
        {name: 'All JMF List', screenName: ''},
        {name: 'All SC List', screenName: ''},
        {name: 'List of Road Profiles', screenName: ''},
        {name: 'TS Internal Only', screenName: ''},
        {name: 'List MCW Own Risk', screenName: ''},
        {name: 'JMF List Archive ', screenName: ''},
      ],
    },
    {
      name: 'Analytics',
      icon: 'chart-bar',
      IconColor: '#858585',

      isDropable: true,
      subItems: [
        {name: 'Site-wide Data Uploads', screenName: ''},
        {name: 'Billing Pendencies', screenName: ''},
        {name: 'JMF Analytics - Graph', screenName: ''},
        {name: 'JMF Analytics - Boxed', screenName: ''},
        {name: 'TS Analytics - Graph', screenName: ''},
        {name: 'TS Analytics - Boxed', screenName: ''},
        {name: 'JMF Approval Pendency', screenName: ''},
        {name: 'JMF - Sample Collection', screenName: ''},
        {name: 'JMF - TS Analytics', screenName: ''},
        {name: 'TS Request Analytics', screenName: ''},
        {name: 'TS Delay Analytics', screenName: ''},
        {name: 'TS Upload Delay', screenName: ''},
        {name: 'SC JMF TS Analytics', screenName: ''},
      ],
    },
  ];

  return (
    <ScrollView>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Image source={require('../logo_login.png')} style={styles.logo} />
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: '#FFFFFF', fontSize: 17}}>getnaveens</Text>
            <Text style={{color: '#6C554F', fontSize: 12, fontWeight: 'bold'}}>
              UPRRDA-Admin
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', marginTop: 40}}>
          <Text style={{color: '#6C6F90', fontSize: 18, fontWeight: 'bold'}}>
            Navigation
          </Text>
          {drawerItems.map((item, index) => (
            <DrawerItems
              key={index}
              {...item}
              onSubItemPress={handleSubItemPress}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              setScreenName={setScreenName}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 2,
    marginHorizontal: 15,
    width: 32,
    height: 32,
    borderRadius: 80,
  },
});

export default DrawerContent;
