import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../types';
import {useUser} from '../utils/userAuth';
import api from '../api';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AppointmentListScreen = () => {
  const routes = useRoute();
  const [appointments, setAppointments] = useState([]);
  const {userDetails} = useUser();

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  useEffect(() => {
    if (userDetails && userDetails.id) {
      api
        .get(`appointments/${userDetails.id}`)
        .then(res => {
          setAppointments(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginLeft: 10,
          padding: 10,
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
        Appointment List screen
      </Text>
      <FlatList
        data={appointments}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate('doctorDetails', {
                  id: item.doctorId,
                  selectedDate: item.date,
                  selectedSlot: item.time,
                  appointmentId: item.appointmentId,
                });
              }}
              style={{
                backgroundColor: '#6295E2',
                padding: 10,
                borderRadius: 10,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'white'}}>{item.name}</Text>
                <Text style={{color: 'white'}}>{item.ratings}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="calendar" color="white" />
                  <Text style={styles.appointmentText}>{item.date}</Text>
                  <Icon name="clock" color="white" />
                  <Text style={styles.appointmentText}>{item.time}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={{color: 'white'}}>{item.currency}</Text>
                  <Text style={{marginLeft: 5, color: 'white'}}>
                    {item.fees}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default AppointmentListScreen;

const styles = StyleSheet.create({
  title: {fontSize: 18, fontWeight: 'bold'},
  value: {color: 'grey'},
  appointmentText: {color: 'white', marginLeft: 5, marginRight: 10},
});
