import React from 'react';
import {View, Image} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppButton from '@/components/AppButton';

import {useTheme} from 'emotion-theming';
import {
  container,
  redeemMsg,
  image,
  email as emailStyle,
  detail,
} from './style';
import AppText from '@/components/AppText2';

const RedeemFail = ({handleTryAgainPress}) => {
  const theme = useTheme();
  return (
    <View style={container(theme)}>
      <View>
        <View>
          <Image
            source={require('@/assets/gift_illustration.png')}
            style={image}
          />
        </View>
        <AppText variant="heading4" style={redeemMsg(theme)}>
          <FormattedMessage
            id="invalid_gift_code"
            defaultMessage="Invalid Gift Code"
          />
        </AppText>
        <AppText variant="body1" style={detail(theme)}>
          <FormattedMessage
            id="make_sure_correct_gift_code"
            defaultMessage="Please make sure you enter the correct code. If you have any queries, please contact {email}"
            values={{
              email: (
                <AppText variant="body1" style={emailStyle(theme)}>
                  token@mdt.io
                </AppText>
              ),
            }}
          />
        </AppText>
      </View>
      <AppButton
        onPress={handleTryAgainPress}
        text={
          <FormattedMessage id="button.try_again" defaultMessage="Try Again" />
        }
        variant="filled"
        sizeVariant="large"
        colorVariant="primary"
      />
    </View>
  );
};

export default RedeemFail;
