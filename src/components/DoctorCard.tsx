import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Doctor from '../images/svg/doctor.svg';
import Chat from '../images/svg/chat.svg';
import Phone from '../images/svg/phone.svg';
import {DocData, HomeStackParamList} from '../types';

const DoctorCard: React.FC<{
  docData: DocData;
  navigation: NativeStackNavigationProp<HomeStackParamList>;
  showFees: boolean;
  calledFrom: string;
}> = ({navigation, docData, showFees, calledFrom}) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          padding: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (calledFrom !== 'details') {
              navigation.navigate('home');
            }
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="chevron-left" style={{marginRight: 10}} />
          <Text style={{color: 'black'}}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Doctor width={80} height={80} />
            <View style={{marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'semibold',
                  color: 'black',
                }}>
                {docData?.name}
              </Text>
              <Text style={{color: 'grey'}}>{docData?.type}</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Chat />
                <Phone style={{marginLeft: 20}} />
              </View>
            </View>
          </View>
          {showFees ? (
            <View style={{justifyContent: 'space-between'}}>
              <View>
                <Text style={{textAlign: 'right'}}>...</Text>
              </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 22,
                  color: 'black',
                  marginTop: 2,
                  textAlign: 'right',
                }}>
                {docData?.currency} {docData?.fees}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DoctorCard;
