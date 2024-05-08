import React from 'react';
import {View, Text} from 'react-native';
import InitialHeader from '../components/InitialHeader';

const UserDetailsScreen = () => {
  return (
    <View>
      <InitialHeader title="A little about yourself" subTitle="hello" />
      <Text>UserDetailsScreen</Text>
    </View>
  );
};

export default UserDetailsScreen;
