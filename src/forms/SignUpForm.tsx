import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import {CheckBox} from '@rneui/themed';
import {colors} from '../utils/global';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../utils/userAuth';
import api from '../api';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type FormData = {
  fullName: string;
  email: string;
  password: string;
  privacyChecked: boolean;
};

const SignUpForm: React.FC<{navigation: NavigationProps}> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      privacyChecked: false,
    },
  });
  const {setUserDetails} = useUser();
  const onSubmit = async (data: FormData) => {
    const userData = await AsyncStorage.getItem('userDetails');

    console.log('userData', userData);

    if (userData) {
      const userDeatils = JSON.parse(userData);
      console.log('called', userDeatils);
      api
        .post('/auth/register', {
          name: data.fullName,
          email: data.email,
          password: data.password,
          gender: userDeatils.gender,
          birthday: userDeatils.dob,
          location: userDeatils.location,
        })
        .then(res => {
          console.log('res', res);
          const {id, name, email, location} = res.data;
          setUserDetails({id: id, name, email, location});
          navigation.navigate('otp');
        })
        .catch(err => {
          console.log(err);
          console.log(err.message);
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        marginTop: 50,
      }}>
      <View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              name="Full Name"
              placeholder="Jan Kowalski"
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="fullName"
          rules={{required: 'FullName is required'}}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              name="Email"
              placeholder="patient@self.com"
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{required: 'Email is required'}}
          defaultValue=""
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <Input
              name="Password"
              placeholder="Min8 cyfr"
              onChangeText={value => onChange(value)}
              value={value}
              additionalProps={{secureTextEntry: true}}
            />
          )}
          name="password"
          rules={{required: 'Password is required'}}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox checked={value} onPress={() => onChange(!value)} />
                <Text>
                  I agree with the Terms and{' '}
                  <Text
                    style={{
                      color: colors.green,
                      textDecorationLine: 'underline',
                    }}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            );
          }}
          rules={{required: 'Please read & accept the policy'}}
          name="privacyChecked"
        />
        {errors.privacyChecked && (
          <Text style={styles.error}>{errors.privacyChecked.message}</Text>
        )}
      </View>

      <View>
        <Button label="Sign Up" onPress={handleSubmit(onSubmit)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('signIn');
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#66CA98',
                textAlign: 'center',
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUpForm;
