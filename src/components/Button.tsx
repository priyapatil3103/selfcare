import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button: React.FC<{
  onPress: any;
  label: string;
  style?: any;
  additionalProps?: any;
}> = ({onPress, label, style, additionalProps}) => {
  return (
    <TouchableOpacity
      {...additionalProps}
      onPress={onPress}
      style={
        style
          ? {
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              padding: 10,
              marginHorizontal: 30,
              backgroundColor: '#66CA98',
              ...style,
            }
          : {
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              padding: 10,
              marginHorizontal: 30,
              backgroundColor: '#66CA98',
            }
      }>
      <Text style={{fontSize: 16, color: 'white'}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
