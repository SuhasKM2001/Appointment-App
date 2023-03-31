import React, {useState} from 'react';
import {auth, db, storage} from '../config';
import {collection, addDoc} from 'firebase/firestore';
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
import Emoji from 'react-native-emoji';
import CustomButton from '../CustomButton';
import {useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

function UserPage() {
  // const {user} = useSelector(state => state.useReducer);
  const [guest, setGuest] = useState('');
  const [title, setTitle] = useState('');
  const [agenda, setAgenda] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showloader, setShowloader] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // }

  const handleConfirm= value =>{
    setDate(date);
    hideDatePicker();
  }

  const onChangefunc = (event, selectedDate) => {
    setDatePickerVisibility(false)

    // on cancel set date value to previous date
    if (event?.type === 'dismissed') {
        setDate(date);
        return;
    }
    setDate(selectedDate);
};

  const senddata = async () => {
    setShowloader(true)
    const appointmentRef = collection(
      db,
      'Users',
      'mk3z1Y3oskfESQuN8gKoWeYpN2J3',
      'AppointmentList',
    );
    addDoc(appointmentRef, {
      Guest: guest,
      Title: title,
      Agenda: agenda,
      Datefield: date,
      Time: time,
    }).then(() => {
      setTitle('');
      setAgenda('');
      setDate('');
      setTime('');
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
      {/* <Text style={styles.headingtext}>Todays Plan</Text> */}
      <Text style={styles.text}>
        Welcome Suhas
        <Emoji name="coffee" style={{fontSize: 40}} />,
      </Text>
      <Text style={styles.text1}>Schedule Appointment</Text>
      <View style={styles.inputcontainer}>
        <Text style={styles.text}>Guest box</Text>
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

        <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          numberOfLines={1}
          editable={false}
          style={styles.textstyle}
          placeholder={'Date of Appointment'}
          placeholderTextColor={'black'}
          // onChangeText={text => {
          //   setDate(text);
          // }}
          value={date}
        />
        { isDatePickerVisible && (<DateTimePicker 
        mode='date'
        is24Hour={true}
        display="default"
        value={date}
        onChange={onChangefunc}
        />)
        }
        {console.log(date)}

        </TouchableOpacity>
        <TextInput
          style={styles.textstyle}
          placeholder={'Time of Appointment'}
          placeholderTextColor={'black'}
          onChangeText={text => {
            setTime(text);
          }}
          value={time}
        />
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
   textAlign:'center',
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
