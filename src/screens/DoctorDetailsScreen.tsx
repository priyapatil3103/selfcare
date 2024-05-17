import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import dayjs from 'dayjs';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Rectangle from '../images/svg/Rectangle.svg';
import Chat from '../images/svg/chat.svg';
import Phone from '../images/svg/phone.svg';
import Doctor from '../images/svg/doctor.svg';
import Details from '../components/Details';
import {colors} from '../utils/global';

import {HomeStackParamList} from '../types';

type NavigationProps = NativeStackNavigationProp<HomeStackParamList>;

const DoctorDetailsScreen = () => {
  const routes = useRoute();
  const navigation = useNavigation<NavigationProps>();

  const [docData, setDocData] = useState<
    | {
        name: string;
        type: string;
        fees: number;
        currency: string;
        patients: number;
        experience: number;
        ratings: number;
        timeSlots: [number];
        about: string;
      }
    | undefined
  >(undefined);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined,
  );
  const [selectedSlot, setSelectedSlot] = useState<number | undefined>(
    undefined,
  );

  const {id} = routes.params;
  console.log('id', id);

  const getDoctorDetails = useCallback(async () => {
    if (id) {
      try {
        const res = await axios.get(`http://192.168.31.242:3005/doctor/${id}`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bWl0LnN1dGFyQGdsb2JhbnQuY29tIiwicGFzc3dvcmQiOiJUZXN0QDEyMyIsImlhdCI6MTY4MzYxNTA3MiwiZXhwIjoxNjgzNjU4MjcyfQ.KnEpye5QA6C_4tbm3b-EU_YyyMAH1Ule2oiS4xD7PoE',
          },
        });
        console.log('res', res);
        setDocData(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  useEffect(() => {
    getDoctorDetails();
  }, [getDoctorDetails]);

  const dates = [];

  for (let i = 0; i < 10; i++) {
    dates.push(dayjs().add(i, 'days').format('YYYY-MM-DD'));
  }

  if (docData) {
    console.log('called');
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="chevron-left" style={{marginRight: 10}} />
            <Text style={{color: 'black'}}>Back</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Doctor width={80} height={80} />
              <View style={{marginLeft: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'semibold',
                    color: 'black',
                  }}>
                  {docData.name}
                </Text>
                <Text style={{color: 'grey'}}>{docData.type}</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Chat />
                  <Phone style={{marginLeft: 20}} />
                </View>
              </View>
            </View>
            <View style={{justifyContent: 'space-between'}}>
              <View>
                <Text style={{textAlign: 'right'}}>...</Text>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  color: 'black',
                  marginTop: 2,
                  textAlign: 'right',
                }}>
                {docData.currency} {docData.fees}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Details label="Patients" value={`+ ${docData.patients}`} />
          <Details label="Experience" value={`+ ${docData.experience}`} />
          <Details label="Ratings" showStar value={`${docData.ratings}`} />
        </View>
        <ScrollView>
          <View>
            <Text style={styles.title}>Schedule</Text>
            <FlatList
              data={dates}
              horizontal
              keyExtractor={item => item}
              renderItem={({item}) => {
                const month = dayjs(item).format('MMM');
                console.log(month);
                const date = dayjs(item).get('date');
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDate(item);
                    }}
                    style={{
                      flex: 1,
                      marginHorizontal: 10,
                      backgroundColor:
                        selectedDate === item ? colors.green : 'white',
                      borderRadius: 10,
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: selectedDate === item ? 'white' : 'black',
                      }}>
                      {date}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        color: selectedDate === item ? 'white' : 'black',
                      }}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {selectedDate ? (
            <View>
              <Text style={styles.title}>Time Slots</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  flexWrap: 'wrap',
                }}>
                {docData.timeSlots.map(item => {
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          selectedSlot === item ? colors.green : 'white',
                        borderRadius: 10,
                        padding: 15,
                      }}
                      onPress={() => {
                        setSelectedSlot(item);
                      }}>
                      <Text
                        style={{
                          color: selectedSlot === item ? 'white' : 'black',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ) : null}

          <>
            {selectedDate && selectedSlot ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('appointmentConfirm', {docData});
                }}
                style={{
                  flexDirection: 'row',
                  backgroundColor: colors.green,
                  alignItems: 'center',
                  margin: 10,
                  borderRadius: 15,
                  paddingVertical: 15,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Rectangle style={{marginLeft: 15}} />
                  <Text
                    style={{
                      color: 'white',
                      marginLeft: 10,
                      fontWeight: 'bold',
                    }}>
                    Make appointment
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginRight: 15}}>
                  <Icon name="angle-right" size={20} color="white" />
                  <Icon
                    name="angle-right"
                    size={20}
                    color="white"
                    style={{marginLeft: 5}}
                  />
                </View>
              </TouchableOpacity>
            ) : null}
          </>

          <Text style={styles.title}>About a doctor</Text>
          <Text style={{color: 'grey', margin: 10, marginTop: 5}}>
            {docData.about}
          </Text>
        </ScrollView>
      </View>
    );
  }
  return <View />;
};

export default DoctorDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
  },
});
