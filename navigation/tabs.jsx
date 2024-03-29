import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppointmentsTab from '../screens/AppointmentsTab';
import UserPage from '../screens/UserPage';
import UserProfileTab from '../screens/UserProfileTab';
import {StyleSheet, Text, View, Image,} from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: '#fcc100',
          height: 60,
        },
        //tabBarIconStyle:{display:"none"},
        headerShown: false,
        ...styles.shadow,
      }}>
      <Tab.Screen
        name="Home"
        component={UserPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 1}}>
              <Image
                source={require('./appointment_schedule.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? '#000' : '#ffe9a1',
                }}
              />
              <Text
                style={{color: focused ? '#000' : '#ffe9a1', fontSize: 12}}>
                Schedule
              </Text>
            </View>
          ),
          headerTintColor: '#ffffff',
          headerTitle: 'Nbyula',
          headerTitleStyle: {
            fontSize: 27, 
            fontFamily: "serif",
            fontWeight: "bold",
            alignContent:'center',
            textAlign:'center',
          },
          
        }}
      />
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentsTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./upcoming_appointment.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#000' : '#ffe9a1',
                }}
              />
              <Text
                style={{color: focused ? '#000' : '#ffe9a1', fontSize: 12}}>
                Appointments
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="User Profile"
        component={UserProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#000' : '#ffe9a1',
                }}
              />
              <Text
                style={{color: focused ? '#000' : '#ffe9a1', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
