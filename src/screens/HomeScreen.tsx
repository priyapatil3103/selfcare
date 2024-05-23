import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchBar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../utils/userAuth';
import {FlatList} from 'react-native';
import Doctor from '../images/svg/female.svg';
import {HomeStackParamList} from '../types';
import api from '../api';
import dayjs from 'dayjs';

type NavigationProps = NativeStackNavigationProp<HomeStackParamList>;
const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
  const [doctorTypes, setDoctorTypes] = useState<
    {
      id: number;
      name: string;
      icon: string;
    }[]
  >([]);

  const [doctors, setDoctors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [appointments, setAppointments] = useState([]);

  const {userDetails} = useUser();

  console.log('userDetails', userDetails);

  const fetchData = async () => {
    try {
      const res = await api.get('doctors-types');
      setDoctorTypes(res.data);

      const response = await api.get('doctors');

      setDoctors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userDetails && userDetails.id) {
        api
          .get(`appointments/${userDetails.id}`)
          .then(res => {
            console.log('rrrr', res.data);
            setAppointments(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        margin: 10,
      }}>
      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 28,
          fontWeight: 'semibold',
          marginTop: 10,
        }}>
        Welcome, {userDetails?.name}!
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <Icon
          name="location-pin"
          size={12}
          style={{
            alignContent: 'center',
            marginTop: Platform.OS === 'ios' ? 0 : 5,
          }}
        />
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 15,
            fontWeight: 'semibold',
            color: '#A7A6A5',
            marginLeft: 10,
          }}>
          Pune
        </Text>
      </View>
      <SearchBar
        inputContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{
          backgroundColor: 'white',
          padding: 0,
          borderRadius: 10,
          marginTop: 10,
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
        }}
        placeholder='Example "heart"'
        onChangeText={value => {
          setSearchText(value);
        }}
        value={searchText}
      />
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {selectedCategories.map(item => {
          return (
            <Text
              key={item}
              style={{
                backgroundColor: '#EFF2F1',
                borderRadius: 10,
                padding: 5,
                margin: 5,
                color: 'grey',
              }}>
              #{item}
            </Text>
          );
        })}
      </View>
      <View>
        {appointments.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={styles.title}>Recent</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('appointmentList');
                }}>
                <Text>See all</Text>
              </TouchableOpacity>
            </View>
            {appointments
              .sort((a, b) => dayjs(a.date) - dayjs(b.date))
              .map((item, index) => {
                console.log('item', item);
                if (index < 2) {
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
                          <Text style={styles.appointmentText}>
                            {item.date}
                          </Text>
                          <Icon name="clock" color="white" />
                          <Text style={styles.appointmentText}>
                            {item.time}
                          </Text>
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
                }
              })}
          </>
        ) : null}
      </View>
      <View>
        <Text style={styles.title}>Categories</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={doctorTypes}
          renderItem={({index, item}) => {
            const bgColors = ['#FFE2DC', '#E0EAF9', '#FFF7DC'];
            const iconColors = ['#FF6C52', '#6295E2', '#F6C25D'];
            return (
              <TouchableOpacity
                onPress={() => {
                  if (selectedCategories.includes(item.name)) {
                    setSelectedCategories(
                      selectedCategories.filter(i => i !== item.name),
                    );
                  } else {
                    setSelectedCategories([...selectedCategories, item.name]);
                  }
                }}
                style={{
                  backgroundColor: 'white',
                  margin: 10,
                  width: 130,
                  height: 80,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  zIndex: 1,
                }}>
                <Icon
                  name={item.icon}
                  color={iconColors[index % bgColors.length]}
                  style={{
                    marginBottom: 10,
                    backgroundColor: bgColors[index % bgColors.length],
                    padding: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                  }}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: 'semibold',
                    fontSize: 12,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.name}
        />
      </View>
      <View>
        <Text style={styles.title}>Popular Doctors</Text>
        <FlatList
          ListEmptyComponent={() => (
            <Text style={{margin: 10, textAlign: 'center', fontWeight: 'bold'}}>
              No doctors with selected category. Please check other options.
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          data={
            selectedCategories.length > 0 || searchText
              ? doctors.filter(item => {
                  return (
                    selectedCategories.includes(item.type) ||
                    item.type.toLowerCase() === searchText.toLowerCase()
                  );
                })
              : doctors
          }
          renderItem={({index, item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('doctorDetails', {
                    id: item.id,
                    selectedDate: undefined,
                    selectedSlot: undefined,
                    appointmentId: undefined,
                  });
                }}
                style={{
                  backgroundColor: 'white',
                  margin: 10,
                  borderRadius: 20,
                  zIndex: 1,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Doctor width={50} height={50} />
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'semibold',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'semibold',
                        fontSize: 12,
                        marginTop: 5,
                      }}>
                      {item.type}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'grey',
                    }}>
                    ({item.patients} reviews)
                  </Text>
                  <Icon
                    style={{marginLeft: 10, marginTop: 2}}
                    name="star"
                    color="#F4A3EC"
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'semibold',
                      fontSize: 12,
                      marginTop: 5,
                    }}>
                    {item.ratings}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: 'black',
    marginTop: 10,
  },
  appointmentText: {color: 'white', marginLeft: 5, marginRight: 10},
});

export default HomeScreen;
