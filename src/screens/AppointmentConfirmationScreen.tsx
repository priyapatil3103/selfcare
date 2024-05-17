import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList, RootStackParamList} from '../types';
import DoctorCard from '../components/DoctorCard';

const AppointmentConfirmationScreen = () => {
  const routes = useRoute();
  const {docData} = routes.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
      }}>
      <DoctorCard
        docData={docData}
        navigation={navigation}
        showFees={false}
        calledFrom="appointmentConfirm"
      />
    </View>
  );
};

export default AppointmentConfirmationScreen;
