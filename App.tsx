import React from 'react';
// import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import StartScreen from './src/screens/StartScreen';
import {RootStackParamList} from './src/types';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ThankYouScreen from './src/screens/ThankYouScreen';

const App = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="signUp">
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="start" component={StartScreen} />
        <Stack.Screen name="userDetails" component={UserDetailsScreen} />
        <Stack.Screen name="signIn" component={SignInScreen} />
        <Stack.Screen name="signUp" component={SignUpScreen} />
        <Stack.Screen name="thankyou" component={ThankYouScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
