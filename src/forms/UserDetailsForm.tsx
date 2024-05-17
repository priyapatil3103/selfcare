import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import Male from '../images/svg/maleicon.svg';
import Female from '../images/svg/female.svg';
import Button from '../components/Button';
import {colors} from '../utils/global';
import Input from '../components/Input';
import {RootStackParamList} from '../types';

type FormData = {gender: 'female' | 'male'; dob: string; location: string};
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const GenderButtons = ({onChange, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          onChange('male');
        }}
        style={styles.button}>
        <View
          style={{
            ...styles.container,
            backgroundColor: value === 'male' ? colors.green : '#F4F6F5',
          }}>
          <Male width={20} height={30} />
        </View>
        <Text
          style={{
            ...styles.genderText,
            color: value === 'male' ? colors.green : 'black',
          }}>
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onChange('female');
        }}
        style={styles.button}>
        <View
          style={{
            ...styles.container,
            backgroundColor: value === 'female' ? colors.green : '#F4F6F5',
          }}>
          <Female width={20} height={30} />
        </View>
        <Text
          style={{
            ...styles.genderText,
            color: value === 'female' ? colors.green : 'black',
          }}>
          Female
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const UserDetailsForm = () => {
  const navigation = useNavigation<NavigationProps>();

  const [disabled, setDisabled] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {gender: 'male', dob: '', location: ''},
  });

  console.log(errors);

  const onSubmit = (val: FormData) => {
    console.log('v', val);
    setDisabled(true);
    AsyncStorage.setItem('userDetails', JSON.stringify(val))
      .then(() => {
        setDisabled(false);
        navigation.navigate('signIn');
      })
      .catch(() => {
        setDisabled(false);
      });
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={styles.label}>Your gender</Text>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <GenderButtons onChange={onChange} value={value} />
          )}
          name="gender"
        />
        <View>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                name="Your birthday"
                placeholder="Min8 cyfr"
                onChangeText={value => onChange(value)}
                value={value}
                labelStyle={styles.label}
              />
            )}
            name="dob"
          />
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              name="Location"
              placeholder="Min8 cyfr"
              onChangeText={value => onChange(value)}
              value={value}
              labelStyle={styles.label}
            />
          )}
          name="location"
        />
      </View>
      <View>
        <Button
          onPress={handleSubmit(onSubmit)}
          label="Continue"
          style={{marginBottom: 20}}
          additionalProps={{disabled}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {fontSize: 18, color: 'black', fontWeight: '400'},
  genderText: {color: colors.green, marginLeft: 20, fontSize: 20},
  container: {
    backgroundColor: colors.green,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default UserDetailsForm;
