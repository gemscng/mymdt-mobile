import React, {useRef, useEffect} from 'react';
import {View, Image, Animated} from 'react-native';
import {FormattedMessage} from 'react-intl';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';

import {MEASURABLE_DATA_TOKEN} from '@/constants/currency';
import {useTheme} from 'emotion-theming';
import {
  container,
  redeemMsg,
  image,
  redeemedAmount as redeemedAmountStyle,
} from './style';
import AppText from '@/components/AppText2';

const ScaleBounce = ({children}) => {
  const scaleBounceAnim = useRef(new Animated.Value(0)).current;
  const scale = scaleBounceAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, 1.2, 0.8, 1],
  });

  useEffect(() => {
    const scaleBounce = () => {
      Animated.timing(scaleBounceAnim, {
        toValue: 3,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
    scaleBounce();
  }, [scaleBounceAnim]);
  return (
    <Animated.View style={{transform: [{scale: scale}]}}>
      {children}
    </Animated.View>
  );
};

const RedeemSuccess = ({handleConfirmPress, amount = 0}) => {
  const theme = useTheme();
  return (
    <View style={container(theme)}>
      <View>
        <ScaleBounce>
          <Image source={require('@/assets/mdt-reward-bg.png')} style={image} />
          <TransactionAmount
            amount={amount}
            unitVariant={MEASURABLE_DATA_TOKEN}
            unitSizeVariant="small"
            amountSizeVariant="large"
            amountColor={theme.colors.background1}
            unitColor={theme.colors.background4}
            showDecimal={false}
            style={redeemedAmountStyle}
          />
        </ScaleBounce>
        <AppText variant="heading4" style={redeemMsg(theme)}>
          <FormattedMessage
            id="redeem_successfully"
            defaultMessage="Successfully Redeemed"
          />
        </AppText>
      </View>
      <AppButton
        onPress={handleConfirmPress}
        text={<FormattedMessage id="button.confirm" defaultMessage="Confirm" />}
        variant="filled"
        sizeVariant="large"
        colorVariant="primary"
      />
    </View>
  );
};

export default RedeemSuccess;
