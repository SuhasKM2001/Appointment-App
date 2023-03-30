import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
function UserPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to home screen</Text>
    </View>
  );
}

export default UserPage;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
    lineHeight: 27,
    marginTop: 23,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})