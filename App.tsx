import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import StartScreen from './src/screens/StartScreen';
import {RootStackParamList} from './src/types';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ThankYouScreen from './src/screens/ThankYouScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@rneui/themed';
import OTPScreen from './src/screens/OTPScreen';
import {UserProvider} from './src/utils/userAuth';
import BottomTab from './src/screens/BottomNavigation';

const App = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="splash">
              <Stack.Screen name="splash" component={SplashScreen} />
              <Stack.Screen name="start" component={StartScreen} />
              <Stack.Screen name="userDetails" component={UserDetailsScreen} />
              <Stack.Screen name="signIn" component={SignInScreen} />
              <Stack.Screen name="signUp" component={SignUpScreen} />
              <Stack.Screen name="otp" component={OTPScreen} />
              <Stack.Screen name="thankyou" component={ThankYouScreen} />
              <Stack.Screen name="main" component={BottomTab} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
