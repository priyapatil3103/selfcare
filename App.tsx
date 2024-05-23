import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@rneui/themed';
import {UserProvider} from './src/utils/userAuth';
import AppStack from './src/screens/AppStack';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <AppStack />
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
