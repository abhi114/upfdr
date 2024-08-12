import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faFile,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const UserManagementScreen = () => {
  return (
    <View style={styles.container}>
      <Text>User Management Screen</Text>
    </View>
  );
};

const SQMVisitsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SQM Visits Screen</Text>
    </View>
  );
};

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Statistics Screen</Text>
    </View>
  );
};

const AnalyticsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Analytics Screen</Text>
    </View>
  );
};

const CustomDrawerContent = ({navigation}) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image
          source={require('../logo_login.png')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.drawerTitle}>getnaveens</Text>
        <Text style={styles.drawerSubtitle}>UPRRDA-Admin</Text>
      </View>
      <View style={styles.drawerItems}>
        <DrawerItem
          icon={faHome}
          title="Dashboard"
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerItem
          icon={faUser}
          title="User Management"
          onPress={() => navigation.navigate('UserManagement')}
        />
        <DrawerItem
          icon={faFile}
          title="SQM Visits"
          onPress={() => navigation.navigate('SQMVisits')}
        />
        <DrawerItem
          icon={faChartBar}
          title="Statistics/Lists"
          onPress={() => navigation.navigate('Statistics')}
        />
        <DrawerItem
          icon={faChartBar}
          title="Analytics"
          onPress={() => navigation.navigate('Analytics')}
        />
      </View>
    </View>
  );
};

const DrawerItem = ({icon, title, onPress}) => {
  return (
    <View style={styles.drawerItem}>
      <FontAwesomeIcon
        icon={icon}
        size={16}
        color="#007bff"
        style={styles.icon}
      />
      <Text style={styles.drawerItemTitle}>{title}</Text>
    </View>
  );
};

const Drawers = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#212121',
            width: 250,
          },
          drawerItemStyle: {
            backgroundColor: '#212121',
            color: '#ffffff',
          },
          headerShown: false,
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="UserManagement" component={UserManagementScreen} />
        <Drawer.Screen name="SQMVisits" component={SQMVisitsScreen} />
        <Drawer.Screen name="Statistics" component={StatisticsScreen} />
        <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#212121',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  drawerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
  },
  drawerItems: {
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#212121',
  },
  icon: {
    marginRight: 15,
  },
  drawerItemTitle: {
    color: '#ffffff',
  },
});

export default Drawers;
