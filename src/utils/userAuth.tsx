import React, {createContext, useState, useContext, FC, useEffect} from 'react';
import {Location} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: null | number;
  name: string | null;
  email: string | null;
  location: Location;
};

const UserContext = createContext<{
  userDetails: User | null;
  setUserDetails: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  userDetails: null,
  setUserDetails: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const UserProvider: FC = ({children}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load the authentication state from storage
    const loadAuthState = async () => {
      const savedState = await AsyncStorage.getItem('userDetails');
      console.log('s', savedState);
      if (savedState !== null) {
        setUserDetails(JSON.parse(savedState));
      }
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      }
    };
    loadAuthState();
  }, []);

  return (
    <UserContext.Provider
      value={{userDetails, setUserDetails, isLoggedIn, setIsLoggedIn}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
