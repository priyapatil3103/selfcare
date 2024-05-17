import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchBar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useUser} from '../utils/userAuth';
import axios from 'axios';
import {FlatList} from 'react-native';
import Doctor from '../images/svg/female.svg';
import {HomeStackParamList} from '../types';

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

  const {userDetails} = useUser();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://192.168.31.242:3005/doctors-types', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bWl0LnN1dGFyQGdsb2JhbnQuY29tIiwicGFzc3dvcmQiOiJUZXN0QDEyMyIsImlhdCI6MTY4MzYxNTA3MiwiZXhwIjoxNjgzNjU4MjcyfQ.KnEpye5QA6C_4tbm3b-EU_YyyMAH1Ule2oiS4xD7PoE',
        },
      });

      setDoctorTypes(res.data);

      const response = await axios.get('http://192.168.31.242:3005/doctors', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bWl0LnN1dGFyQGdsb2JhbnQuY29tIiwicGFzc3dvcmQiOiJUZXN0QDEyMyIsImlhdCI6MTY4MzYxNTA3MiwiZXhwIjoxNjgzNjU4MjcyfQ.KnEpye5QA6C_4tbm3b-EU_YyyMAH1Ule2oiS4xD7PoE',
        },
      });

      setDoctors(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
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
              style={{
                backgroundColor: 'grey',
                borderRadius: 10,
                padding: 5,
                margin: 5,
              }}>
              #{item}
            </Text>
          );
        })}
      </View>

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

      <Text style={styles.title}>Popular Doctors</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          selectedCategories.length > 0 || searchText
            ? doctors.filter(item => {
                console.log(
                  'check',
                  item.type,
                  searchText,
                  item.type.toLowerCase() === searchText.toLowerCase(),
                );
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
                navigation.navigate('doctorDetails', {id: item.id});
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
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 18, fontWeight: 'semibold', color: 'black', marginTop: 10},
});

export default HomeScreen;
