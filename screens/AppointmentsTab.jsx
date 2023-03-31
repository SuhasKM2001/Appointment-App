import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import CustomButton from '../CustomButton';
import {db} from '../config';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

function AppointmentsTab({navigation}) {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.useReducer);
  const [data, setdata] = useState([]);
  useEffect(() => {
    ReadData();
  }, []);

  const ReadData = () => {
    const appointmentRef = collection(db, 'Users', user, 'AppointmentList');

    onSnapshot(appointmentRef, querySnapshot => {
      const appointmentData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setdata(appointmentData);
    });
  };

  return (
    <View style={styles.usercontainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headingtext}>Upcoming Appointments</Text>
        {data.map((cards, index) => (
          <View style={styles.carddesign} key={index}>
            {/* <Image source={{uri: cards.ImageUri}} style={styles.cardimage} /> */}
            <Image
              source={require('./card_avatar.jpg')}
              style={styles.cardimage}
              resizeMode="stretch"
            />
            <View style={styles.carddetails}>
            <Text style={styles.relativedetails}>{cards.Guest}</Text>
            <Text style={styles.relativedetails1}>{cards.Title}</Text>
            <Text style={styles.relativedetails2}>{cards.Agenda}</Text>
            <View style={styles.scheduledetails}>
              <Icon name="clock-o" size={20}/>
              <Text style={styles.icontextdesign}>{cards.Time}</Text>
              <Icon name="calendar" size={20}/>
              <Text style={styles.icontextdesign}>{cards.Datefield}</Text>
            </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default AppointmentsTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // paddingBottom:120,
    paddingTop: 15,
  },
  headingtext: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  carddesign: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#F9CA62',
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
  },
  cardimage: {
    width: 125,
    height: 125,
    borderRadius: 80,
    marginTop:22,
    marginBottom:18
  },
  carddetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  scheduledetails:{
    flex:1,
    flexDirection: 'row',
    margin:5,
  },
  relativedetails: {
    fontSize: 22,
    color: 'black',
    margin: 5,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  relativedetails1: {
    fontSize: 18,
    color: '#457C7E',
    margin: 5,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  relativedetails2: {
    fontSize: 16,
    color: '#457C7E',
    margin: 5,
    fontFamily: 'serif',
  },
  icontextdesign:{
    paddingRight:12,
    paddingLeft:5,
    fontSize:14,
    fontFamily: 'serif',
  },
  buttonContainer: {
    marginTop: 10,
    width: '70%',
    backgroundColor: '#131E3A',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
