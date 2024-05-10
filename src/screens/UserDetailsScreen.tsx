import React from 'react';
import {View} from 'react-native';
import InitialHeader from '../components/InitialHeader';
import UserDetailsForm from '../forms/UserDetailsForm';

const UserDetailsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <InitialHeader title="A little about yourself" subTitle="hello" />
      <UserDetailsForm />
    </View>
  );
};

export default UserDetailsScreen;
