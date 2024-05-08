import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button: React.FC<{onPress: () => void; label: string}> = ({
  onPress,
  label,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 30,
        backgroundColor: '#66CA98',
      }}>
      <Text style={{fontSize: 16, color: 'white'}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
