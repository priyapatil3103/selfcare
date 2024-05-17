import React from 'react';
import {View, Text} from 'react-native';
import Star from '../images/svg/star.svg';

const Details: React.FC<{
  label: string;
  value: string | number;
  showStar?: boolean;
}> = ({label, value, showStar = false}) => {
  return (
    <View>
      <Text style={{textAlign: 'center'}}>{label}</Text>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: 10,
          zIndex: 1,
          padding: 10,
          paddingHorizontal: 35,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
          }}>
          {value}
        </Text>
        {showStar ? <Star style={{marginLeft: 5}} /> : null}
      </View>
    </View>
  );
};

export default Details;
