import React from 'react';
import Button from '../components/Button';
import {useUser} from '../utils/userAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersScreen = () => {
  const {setIsLoggedIn} = useUser();

  return (
    <Button
      label="logout"
      onPress={() => {
        setIsLoggedIn(false);
        AsyncStorage.removeItem('userToken');
      }}
    />
  );
};

export default UsersScreen;
