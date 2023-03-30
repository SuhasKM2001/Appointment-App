import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import CustomButton from './CustomButton';
import {doc, setDoc} from 'firebase/firestore';
import {db} from './config';
import CustomInput from './CustomInput';

const windowHeight = Dimensions.get('window').height;

function SignupPage({navigation}) {
  // const navigation = useNavigation();
  const [userdetail, setuserdetail] = useState({
    email: '',
    name: '',
  });

  const signup = () => {
    createUserWithEmailAndPassword(auth, userdetail.email, userdetail.password)
      .then(userCredential => {
        setDoc(doc(db, 'Users', userCredential.user.uid), {
          Email: userdetail.email,
          Name: userdetail.name,
        });
        alert('User created successfully');
        navigation.navigate('userloginpage');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage);
      });
  };
  return (
    <View style={styles.loginmainpage}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appcontainer}>
          <Image
            source={require('./Loginimage.jpg')}
            style={styles.loginimage}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.loginmainpage1}>
        <Text style={styles.loginpagetext}>Sign Up</Text>
          <CustomInput
            placeholderText={'Email'}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={text => setuserdetail({...userdetail, email: text})}
            Icon={Fontisto}
            Icontype={'email'}
          />
          <CustomInput
            placeholderText={'Name'}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setuserdetail({...userdetail, name: text})}
            Icon={Ionicons}
            Icontype={'ios-person-outline'}
          />
          <CustomInput
            placeholderText={'Password'}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setuserdetail({...userdetail, password: text})}
            Icon={AntDesign}
            Icontype={'lock'}
          />
          <CustomInput
            placeholderText={'Confirm-Password'}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setuserdetail({...userdetail, password: text})}
            Icon={AntDesign}
            Icontype={'lock'}
          />
        <CustomButton
          onPress={() => signup()}
          buttonStyle={{
            backgroundColor: '#457C7E',
            margin: 10,
            paddingLeft:20,
            paddingRight:20,
            width:'50%',
          }}
          buttonTitle="Sign Up"
        />
        </View>
      </ScrollView>
    </View>
  );
}

export default SignupPage;

const styles = StyleSheet.create({
  loginmainpage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 40,
  },
  loginmainpage1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:30,
    borderColor:'#000',
    borderRadius:2,
    borderRadius:10,
    backgroundColor:'#F9CA62'
  },
  appname: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
    color:'black',
  },
  logincontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginimage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
  },
  loginpagetext: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  register: {
    color: 'black',
    fontSize: 17,
    margin: 15,
  },
  iconcontainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '95%',
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: windowHeight / 15,
  },
  icon: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: 60,
  },
});
