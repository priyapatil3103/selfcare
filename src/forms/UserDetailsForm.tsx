import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import Male from '../images/svg/maleicon.svg';
import Female from '../images/svg/female.svg';
import Button from '../components/Button';
import {colors, location} from '../utils/global';
import {RootStackParamList} from '../types';
import dayjs from 'dayjs';

type FormData = {
  gender: 'female' | 'male';
  dob: string | Date;
  location: string;
};
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
  const [isDatePicker, setDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {gender: 'male', dob: dayjs(), location: ''},
  });

  const onSubmit = (val: FormData) => {
    const locationToPass = location.filter(item => item.name === val.location);
    setDisabled(true);
    AsyncStorage.setItem(
      'userDetails',
      JSON.stringify({...val, location: locationToPass}),
    )
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
        <Text style={[styles.label, {marginTop: 20}]}>Your gender</Text>
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
            render={({field: {onChange, value}}) => {
              const date = dayjs(value).format('DD/MM/YYYY').split('/');

              return (
                <>
                  <Text style={styles.label}>Your birthday</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePicker(true);
                    }}
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}>
                    <View>
                      <Text style={{color: 'grey'}}>Day:</Text>
                      <Text style={styles.value}>{date[0]}</Text>
                    </View>
                    <View>
                      <Text style={{color: 'grey'}}>Month:</Text>
                      <Text style={styles.value}>{date[1]}</Text>
                    </View>
                    <View>
                      <Text style={{color: 'grey'}}>Year:</Text>
                      <Text style={styles.value}>{date[2]}</Text>
                    </View>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isDatePicker}
                    mode="date"
                    onConfirm={date => {
                      onChange(date);
                      setDatePicker(false);
                    }}
                    onCancel={() => {
                      setDatePicker(false);
                    }}
                  />
                </>
              );
            }}
            name="dob"
            rules={{required: 'Dob is required'}}
          />
          {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}
        </View>

        <Text style={styles.label}>Your location</Text>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <RNPickerSelect
              onValueChange={value => onChange(value)}
              items={location.map(item => {
                return {label: item.name, value: item.name};
              })}
              value={value}
            />
          )}
          name="location"
          rules={{required: 'Please select location and try again'}}
        />
        {errors.location && (
          <Text style={styles.error}>{errors.location.message}</Text>
        )}
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
  label: {fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 10},
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
  value: {
    color: 'black',
    padding: 10,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 5,
    paddingRight: 25,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UserDetailsForm;
