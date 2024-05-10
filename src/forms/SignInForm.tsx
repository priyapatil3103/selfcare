import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm, Controller} from 'react-hook-form';
import Input from '../components/Input';
import Button from '../components/Button';
import {RootStackParamList} from '../types';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type FormData = {email: string; password: string};

const SignInForm = () => {
  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {email: '', password: ''},
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission here
    console.log(data);
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
              name="Email"
              placeholder="patient@self.com"
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{required: 'Email is required', pattern: /^\S+@\S+$/i}}
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
        <TouchableOpacity>
          <Text
            style={{
              color: '#66CA98',
              textAlign: 'right',
            }}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button label="Sign In" onPress={handleSubmit(onSubmit)} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text style={{textAlign: 'center'}}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('signUp');
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#66CA98',
                textAlign: 'center',
              }}>
              Sign Up
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
  },
});

export default SignInForm;
