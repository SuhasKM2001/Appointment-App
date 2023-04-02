import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import CustomButton from '../CustomButton';
import {db} from '../config';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import AppointmentForm from './AppointmentForm';
import Emoji from 'react-native-emoji';

function AvailablePeople({navigation}) {
  const {user: loggedUser} = useSelector(state => state.useReducer);
  const [data, setdata] = useState([]);

  
  useEffect(() => {
    console.log(data);
  }, [data]);


  useEffect(() => {
    ReadData();
  }, []);

  const ReadData = () => {
    const usersRef = collection(db, 'Users');
    onSnapshot(usersRef, querySnapshot => {
      const usersData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setdata(usersData);
    });
  };


  return (
    <View style={styles.usercontainer}>
      <Text style={styles.text}>
       Welcome Suhas
        <Emoji name="coffee" style={{fontSize: 40}} />,
      </Text>
      <Text style={styles.text1}>Available for meeting</Text>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        {data &&
          data.map((user, index) => {
            return (
              user.Id != loggedUser && (
                <View style={styles.carddesign} key={index}>
                  <Image
                    source={require('./card_avatar.jpg')}
                    style={styles.cardimage}
                    resizeMode="stretch"
                  />
                  <View style={styles.carddetails}>
                    <Text style={styles.relativedetails}>{user.Name}</Text>
                    <View style={styles.scheduledetails}>
                      {user.Availability ? (
                        <Text style={styles.icontextdesign1}>Available</Text>
                      ) : (
                        <Text style={styles.icontextdesign}>Not Available</Text>
                      )}
                    </View>
                    <View>
                      <CustomButton
                        buttonTitle="Schedule Appointmnet"
                        buttonStyle={{
                          width: '60%',
                        }}
                        onPress={() => navigation.navigate(AppointmentForm)}
                      />
                    </View>
                  </View>
                </View>
              )
            );
          })}
      </ScrollView>
    </View>
  );
}

export default AvailablePeople;

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
    marginTop: 22,
    marginBottom: 18,
  },
  carddetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  scheduledetails: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
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
  icontextdesign: {
    fontSize: 14,
    fontFamily: 'serif',
    color: '#FF0000',
  },
  icontextdesign1: {
    fontSize: 14,
    fontFamily: 'serif',
    color: '#006a4e',
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
    marginTop: 20,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});
