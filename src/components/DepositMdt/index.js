import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';
import Clipboard from '@react-native-community/clipboard';

import AppText from '@/components/AppText2';

import CopyIcon from '@/assets/icon_copy.svg';

import {
  mediumEmphasis,
  highEmphasis,
  depositAddress,
  inputContainer,
  rowContainer,
  copy,
  copyText,
} from './style';
import {FormattedMessage} from 'react-intl';

const DepositMdt = ({detail, address}) => {
  const theme = useTheme();

  const copyToClipboard = () => {
    Clipboard.setString(address);
  };

  return (
    <View>
      {detail}
      <AppText variant="label" style={[depositAddress, mediumEmphasis(theme)]}>
        <FormattedMessage
          id="mdt_deposit_address"
          defaultMessage="MDT Deposit Address"
        />
      </AppText>
      <View style={rowContainer}>
        <View style={inputContainer(theme)}>
          <TextInput
            multiline={true}
            textAlignVertical="top"
            value={address}
            style={highEmphasis(theme)}
            editable={false}
          />
        </View>
        <TouchableOpacity onPress={copyToClipboard} style={copy}>
          <CopyIcon
            fill={theme.colors.primary.normal}
            stroke={theme.colors.primary.normal}
            strokeWidth={2}
          />
          <AppText variant="button" style={copyText(theme)}>
            <FormattedMessage id="button.copy" defaultMessage="Copy" />
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepositMdt;
