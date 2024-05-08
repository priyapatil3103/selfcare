import React from 'react';
import {Text, View} from 'react-native';
import Logo from '../images/svg/logo.svg';

const InitialHeader: React.FC<{title: string; subTitle?: string}> = ({
  title,
  subTitle,
}) => {
  return (
    <View style={{alignItems: 'center', marginTop: 30}}>
      <Logo width={40} height={42} />
      <Text
        style={{
          fontSize: 28,
          color: '#1C1F1E',
          fontWeight: 'semibold',
          marginTop: 10,
        }}>
        {title}
      </Text>
      {subTitle ? (
        <Text
          style={{
            fontSize: 14,
            color: '#1C1F1E',
            marginTop: 10,
          }}>
          {subTitle}
        </Text>
      ) : null}
    </View>
  );
};

export default InitialHeader;
