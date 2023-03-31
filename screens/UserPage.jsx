import React, {useEffect, useState, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppointmentForm from './AppointmentForm';
import AvailablePeople from './AvailablePeople';
import {auth, db, storage} from '../config';
import {collection, addDoc} from 'firebase/firestore';
import {
  StyleSheet,
} from 'react-native';

const Stack = createStackNavigator();
function UserPage() {
  return(
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="AvailablePeople" component={AvailablePeople} />
      <Stack.Screen name="AppointmentForm" component={AppointmentForm} />
    </Stack.Navigator>
  )
}

export default UserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputcontainer: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    // marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  textstyle: {
    height: 40,
    borderWidth: 2,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 18,
    borderRadius: 8,
  },
  text: {
    color: 'black',
    fontSize: 30,
    // lineHeight: 27,
    marginTop: 20,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  text1: {
    color: 'black',
    fontSize: 20,
    // lineHeight: 27,
    marginTop: 80,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
  },

  headingtext: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    marginTop: 8,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
