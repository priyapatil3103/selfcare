import React, {useState, useRef} from 'react';
import {View, TextInput} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import Button from '../components/Button';
import InitialHeader from '../components/InitialHeader';
import axios from 'axios';
import {useUser} from '../utils/userAuth';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const OTPScreen = () => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpInputs = useRef<TextInput[]>([]);
  const navigation = useNavigation<NavigationProps>();

  const {userDetails} = useUser();

  const handleChangeOTP = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    // Focus next input field if available
    if (value !== '' && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const verifyOtp = () => {
    axios
      .post('http://192.168.31.242:3005/auth/verify', {
        userId: userDetails?.id,
        otp: otp.join('').toString(),
      })
      .then(() => {
        navigation.navigate('main');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View>
        <InitialHeader title="Your Code" subTitle="Code send to your Email" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
            alignSelf: 'center',
            marginTop: 40,
          }}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={ref => (otpInputs.current[index] = ref as TextInput)}
              style={{
                height: 40,
                width: 40,
                borderColor: 'gray',
                borderWidth: 1,
              }}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={text => handleChangeOTP(index, text)}
              value={value}
            />
          ))}
        </View>
      </View>
      <Button
        onPress={() => {
          verifyOtp();
        }}
        label="Verify"
        style={{marginBottom: 20}}
      />
    </View>
  );
};

export default OTPScreen;
