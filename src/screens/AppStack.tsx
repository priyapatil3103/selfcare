import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../screens/AuthStack';
import BottomTab from '../screens/BottomNavigation';
import {useUser} from '../utils/userAuth';

const AppStack = () => {
  const {isLoggedIn} = useUser();

  return (
    <NavigationContainer>
      {isLoggedIn ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppStack;
