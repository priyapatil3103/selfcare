import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import Male from '../images/svg/maleicon.svg';
import Female from '../images/svg/female.svg';
import Button from '../components/Button';
import {colors} from '../utils/global';
import Input from '../components/Input';
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
    watch,
  } = useForm<FormData>({
    defaultValues: {gender: 'male', dob: dayjs(), location: ''},
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

  const date = watch('dob');
  console.log('d', date);
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
          />
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              name="Location"
              placeholder="Pune"
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
});

export default UserDetailsForm;
