import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList, RootStackParamList} from '../types';
import DoctorCard from '../components/DoctorCard';
import Button from '../components/Button';

const AppointmentConfirmationScreen = () => {
  const routes = useRoute();
  const {docData, selectedDate, selectedSlot} = routes.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <DoctorCard
          docData={docData}
          navigation={navigation}
          showFees={false}
          calledFrom="appointmentConfirm"
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
            marginHorizontal: 20,
            marginTop: 20,
          }}>
          <View>
            <Text style={styles.title}>Date:</Text>
            <Text style={styles.value}>{selectedDate}</Text>
          </View>
          <View>
            <Text style={styles.title}>Time:</Text>
            <Text style={styles.value}>{selectedSlot}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
            margin: 10,
          }}>
          <Text style={styles.title}>Fees</Text>
          <Text style={styles.title}>
            {docData.currency} {docData.fees}
          </Text>
        </View>
      </View>
      <View style={{marginBottom: 10}}>
        <Button
          label="Go to payment"
          onPress={() => {
            navigation.navigate('payment', {
              id: docData.id,
              selectedDate,
              selectedSlot,
            });
          }}
          style={{marginTop: 30}}
        />
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => {
            navigation.navigate('doctorDetails', {
              id: docData.id,
              selectedDate,
              selectedSlot,
            });
          }}>
          <Text style={{textAlign: 'center', color: 'grey'}}>
            Cancel reservation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentConfirmationScreen;

const styles = StyleSheet.create({
  title: {fontSize: 18, fontWeight: 'bold'},
  value: {color: 'grey'},
});
