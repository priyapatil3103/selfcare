import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CheckBox} from '@rneui/base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/Button';
import {useUser} from '../utils/userAuth';
import api from '../api';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const PaymentScreen = () => {
  const routes = useRoute();
  console.log(routes.params);
  const {id, selectedDate, selectedSlot} = routes.params;
  const insets = useSafeAreaInsets();
  const {userDetails} = useUser();
  const navigation = useNavigation<NavigationProps>();

  const [paymentOption, setPaymentOption] = useState<'visit' | 'upi'>('visit');

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        justifyContent: 'space-between',
      }}>
      <View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            marginLeft: 10,
          }}>
          <Icon name="chevron-left" style={{marginRight: 10}} size={20} />
          <Text style={{color: 'black', fontSize: 20}}>Back</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 18,
            margin: 10,
            marginTop: 20,
          }}>
          Payment Option
        </Text>
        <View style={styles.button}>
          <CheckBox
            onPress={() => {
              setPaymentOption('visit');
            }}
            checked={paymentOption === 'visit'}
          />
          <Text>Pay On Visit</Text>
        </View>
        <View style={styles.button}>
          <CheckBox
            onPress={() => {
              setPaymentOption('upi');
            }}
            checked={paymentOption === 'upi'}
          />
          <Text>UPI</Text>
        </View>
      </View>
      <View style={{marginBottom: 10}}>
        <Button
          label="Pay"
          onPress={async () => {
            console.log({
              userId: userDetails?.id,
              doctorId: id,
              date: selectedDate,
              time: selectedSlot,
              status: 'active',
              paymentMode: paymentOption === 'visit' ? 'Pay on Visit' : 'UPI',
            });
            try {
              await api.post(
                'http://192.168.31.242:3005/appointment',
                {
                  userId: userDetails?.id,
                  doctorId: id,
                  date: selectedDate,
                  time: selectedSlot,
                  status: 'active',
                  paymentMode:
                    paymentOption === 'visit' ? 'Pay on Visit' : 'UPI',
                },
                {
                  headers: {
                    Authorization:
                      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bWl0LnN1dGFyQGdsb2JhbnQuY29tIiwicGFzc3dvcmQiOiJUZXN0QDEyMyIsImlhdCI6MTY4MzYxNTA3MiwiZXhwIjoxNjgzNjU4MjcyfQ.KnEpye5QA6C_4tbm3b-EU_YyyMAH1Ule2oiS4xD7PoE',
                  },
                },
              );
              if (paymentOption === 'visit') {
                navigation.navigate('thankyou');
              }
            } catch (err) {
              console.log(err);
            }
          }}
        />
      </View>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
