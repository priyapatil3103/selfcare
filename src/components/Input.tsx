import React from 'react';
import {TextInput, View, Text, TextInputProps} from 'react-native';

const Input: React.FC<{
  placeholder: string;
  onChangeText?: ((text: string) => void) | undefined;
  value: string | undefined;
  name: string;
  additionalProps?: TextInputProps;
  labelStyle?: any;
}> = ({
  placeholder,
  onChangeText,
  value,
  name,
  additionalProps,
  labelStyle,
}) => {
  return (
    <View>
      <Text
        style={{
          color: '#A7A6A5',
          fontSize: 15,
          fontWeight: 'bold',
          marginBottom: 5,
          ...labelStyle,
        }}>
        {name}
      </Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={{
          borderRadius: 10,
          backgroundColor: '#EFF2F1',
          paddingVertical: 0,
          height: 50,
        }}
        {...additionalProps}
      />
    </View>
  );
};

export default Input;
