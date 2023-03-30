import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet,ScrollView,TextInput} from 'react-native';
import Emoji from 'react-native-emoji';
function UserPage() {
  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.headingtext}>Todays Plan</Text> */}
      <Text style={styles.text}>Welcome Suhas 
        <Emoji name="coffee" style={{fontSize: 40}} />,
      </Text>

      <View style={styles.inputcontainer}>
        <Text>Guest</Text>
        <TextInput
            style={styles.textstyle}
            placeholder="Enter Title"
            placeholderTextColor={'black'}
            // onChangeText={text => {
            //   setName(text);
            // }}
            //value={name}
          />
          <TextInput
            style={styles.textstyle}
            placeholder="Enter Agenda"
            // onChangeText={text => {
            //   setName(text);
            // }}
            // value={name}
          />
           <TextInput
            style={styles.textstyle}
            placeholder="Date of Appointment"
            // onChangeText={text => {
            //   setName(text);
            // }}
            // value={name}
          />
           <TextInput
            style={styles.textstyle}
            placeholder="Time of Appointment"
            // onChangeText={text => {
            //   setName(text);
            // }}
            // value={name}
          />
      </View>
    </ScrollView>
  );
}

export default UserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputcontainer: {
    borderWidth:1,
  },
  textstyle: {
    height: 40,
    borderWidth:2,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#000',
    fontSize: 18,
  },
  text: {
    color: 'black',
    fontSize: 30,
    // lineHeight: 27,
    marginTop: 20,
    fontFamily:'serif',
    fontWeight:'bold',
  },
  
  headingtext: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    marginTop:8,
    marginBottom: 5,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
})