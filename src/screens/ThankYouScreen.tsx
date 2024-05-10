import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {colors} from '../utils/global';
import Check from '../images/svg/Check.svg';
import Thank from '../images/svg/thankyou.svg';

const ThankYouScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <Thank width={20} height={20} />
        <Text style={[styles.text, {marginLeft: 5}]}>Self Care</Text>
      </View>
      <Text style={[styles.text, {fontWeight: 'bold', fontSize: 25}]}>
        Thank you!
      </Text>
      <Check />
      <Text style={[styles.text, {fontSize: 16, marginTop: 10}]}>
        Your visit has been successfully reserved, please pay for it to get an
        appointment with selected doctor
      </Text>
      <TouchableOpacity style={{position: 'absolute', bottom: 20}}>
        <Text style={[styles.text, {textDecorationLine: 'underline'}]}>
          Go to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {color: '#FFFFFF', marginBottom: 20},
});

export default ThankYouScreen;
