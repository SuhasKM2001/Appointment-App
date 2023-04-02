import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Switch} from 'react-native';
import CustomButton from '../CustomButton';
import {signOut} from 'firebase/auth';
import {auth, db, storage} from '../config';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../Redux/Actions';

function UserProfileTab({navigation}) {
  const {user} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();
  const [accountInfo, setAccountInfo] = useState([]);
  const [availability, setAvailability] = useState(true);

  const logout = () => {
    try {
      signOut(auth).then(() => {
        AsyncStorage.removeItem('UserData').then(() => {
          dispatch(setUser(''));
          navigation.navigate('userloginpage');
        });
      });
    } catch (error) {
      Alert(error);
    }
  };

  useEffect(() => {
    Userdata();
  }, []);

  const Userdata = async () => {
    try {
      const UserRef = doc(db, 'Users', user);
      onSnapshot(UserRef, doc => {
        setAccountInfo(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const UserRef = doc(db, 'Users', user);
    updateDoc(UserRef, {
      Availability: availability,
    });
  }, [availability]);

  const toggleAvailability = () => {
    setAvailability(!availability);
  };

  return (
    <View style={styles.usercontainer}>
      <View style={styles.userdetails}>
        <Image
          source={require('./card_avatar.jpg')}
          style={styles.cardimage}
          resizeMode="stretch"
        />
        <Text style={styles.text}>{accountInfo.Name}</Text>
        <Text style={styles.text}>{accountInfo.Email}</Text>
        <Text style={styles.text}>Availability</Text>
        <Switch
          trackColor={{false: 'red', true: 'green'}}
          onValueChange={toggleAvailability}
          value={availability}
        />

        <View style={styles.buttonstyle}>
          <CustomButton buttonTitle="Sign Out" onPress={() => logout()} />
        </View>
      </View>
    </View>
  );
}
export default UserProfileTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // paddingTop: 50,
  },
  userdetails: {
    // flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ddd',
    padding: 50,
  },
  buttonstyle: {
    // flex: 1.5,
    width: '90%',
    marginTop: 20,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  cardimage: {
    width: 125,
    height: 125,
    borderRadius: 80,
    marginTop: 22,
    marginBottom: 18,
  },
  toggleText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 18,
  },
  text: {
    color: 'black',
    fontSize: 20,
    // lineHeight: 27,
    marginTop: 20,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});
