import React, {useEffect, useState, useRef} from 'react';
import {auth, db, storage} from '../config';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import moment from 'moment';

function AppointmentForm({route}) {
  const {user} = useSelector(state => state.useReducer);
  const [title, setTitle] = useState('');
  const [agenda, setAgenda] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showloader, setShowloader] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [displayDate, setDisplayDate] = useState('');
  const [displayTime, setDisplayTime] = useState('');
  const [loggedInName, setLoggedInName] = useState([]);
  const isMountDate = useRef(false);
  const isMountTime = useRef(false);
  const user_id = route.params.userID;
  const [guest, setGuest] = useState(route.params.userName);

  // const {id} = route.params;

  useEffect(() => {
    if (isMountDate.current) {
      setDisplayDate(date.toISOString().split('T')[0]);
    }
    isMountDate.current = true;
  }, [date]);

  useEffect(() => {
    if (isMountTime.current) setDisplayTime(moment(time).format('kk:mm'));
    isMountTime.current = true;
  }, [time]);

  useEffect(() => {
    UserLoggedData();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const onChangeDatefunc = (event, selectedDate) => {
    setDatePickerVisibility(false);

    // on cancel set date value to previous date
    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }
    setDate(selectedDate);
  };
  const onChangeTimefunc = (event, selectedTime) => {
    setTimePickerVisibility(false);

    // on cancel set date value to previous date
    if (event?.type === 'dismissed') {
      setTime(time);
      return;
    }
    setTime(selectedTime);
  };

  const UserLoggedData = async () => {
    try {
      const UserRef = doc(db, 'Users', user);
      onSnapshot(UserRef, doc => {
        setLoggedInName(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const senddata = async () => {
    setShowloader(true);
    const guestRef = collection(db, 'Users', user, 'AppointmentList');
    addDoc(guestRef, {
      Guest: guest,
      Title: title,
      Agenda: agenda,
      Datefield: displayDate,
      Time: displayTime,
    }).then(() => {
      setGuest('');
      setTitle('');
      setAgenda('');
      setDisplayDate('');
      setDisplayTime('');
      setShowloader(false);
      ToastAndroid.show(
        'Appointment Scheduled',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    });
    const appointmentRef = collection(db, 'Users', user_id, 'AppointmentList');
    addDoc(appointmentRef, {
      Guest: loggedInName.Name,
      Title: title,
      Agenda: agenda,
      Datefield: displayDate,
      Time: displayTime,
    }).then(() => {
      setLoggedInName('');
      setTitle('');
      setAgenda('');
      setDisplayDate('');
      setDisplayTime('');
      setShowloader(false);
      ToastAndroid.show(
        'Appointment Scheduled',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.text1}>Schedule Appointment</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textstyle}
            placeholder={'Title of meeting'}
            placeholderTextColor={'black'}
            onChangeText={text => {
              setTitle(text);
            }}
            value={title}
          />
          <TextInput
            style={styles.textstyle}
            placeholder={'Agenda of meeting'}
            placeholderTextColor={'black'}
            onChangeText={text => {
              setAgenda(text);
            }}
            value={agenda}
          />

          {/* Date input */}
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              numberOfLines={1}
              editable={false}
              style={styles.textstyle}
              placeholder={'Date of Appointment'}
              placeholderTextColor={'black'}
              // value={date?date.toISOString().split('T')[0]:''}
              value={displayDate}
            />
            {isDatePickerVisible && (
              <DateTimePicker
                mode="date"
                is24Hour={true}
                display="default"
                value={date}
                onChange={onChangeDatefunc}
              />
            )}
          </TouchableOpacity>

          {/* Time input */}
          <TouchableOpacity onPress={showTimePicker}>
            <TextInput
              numberOfLines={1}
              editable={false}
              style={styles.textstyle}
              placeholder={'Time of Appointment'}
              placeholderTextColor={'black'}
              // value={moment(time).format("kk:mm")}
              value={displayTime}
            />

            {isTimePickerVisible && (
              <DateTimePicker
                mode="time"
                // is24Hour={true}
                display="default"
                value={time}
                onChange={onChangeTimefunc}
              />
            )}
          </TouchableOpacity>

          <CustomButton
            buttonStyle={{marginLeft: 200, marginBottom: 20}}
            onPress={() => senddata()}
          />
        </View>
      </ScrollView>
      {showloader && (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="#457C7E"
            animating={showloader}
          />
        </View>
      )}
    </View>
  );
}

export default AppointmentForm;

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
    paddingTop: 20,
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
    fontSize: 23,
    // lineHeight: 27,
    marginTop: 150,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: 'bold',
    paddingBottom: 20,
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
