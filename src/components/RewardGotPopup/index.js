import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';

import {GET_CONVERSION_RATE_API, GET_CURRENCY_CODE} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import {
  convertedText,
  gotRewardText,
  convertedContainer,
  centered,
  container,
} from './style';

import {REWARD_DOLLAR, ME} from '@/constants/currency';
import MRPGiftBox from '@/components/MRPGiftBox';
import MeGiftBox from '@/components/MeGiftBox';
import AppText from '@/components/AppText2';
import PopupModalWithLinearGradient from '@/components/PopupModalWithLinearGradient';
import TransactionAmount from '@/components/TransactionAmount';

const RewardGotPopup = ({rewardName, rewardAmount, onOkPress, ...props}) => {
  const theme = useTheme();

  const {data: currencyCodeData} = useQueryWithAuth(GET_CURRENCY_CODE);
  const cashbackCurrencyCode =
    currencyCodeData?.userProfile?.cashbackCurrencyCode;
  const convert = cashbackCurrencyCode === ME;
  // only call when convert to mdt
  const {data} = useQueryWithAuth(GET_CONVERSION_RATE_API, {
    skip: !convert || rewardAmount === 0,
    variables: {
      from: REWARD_DOLLAR,
      to: ME,
    },
  });

  const conversionRate = data?.conversionRate || 0;
  const convertedRewardAmount = rewardAmount * conversionRate;
  const primaryColor = theme.colors.primary.normal;
  const secondaryColor = theme.colors.secondary.normal;

  return (
    <PopupModalWithLinearGradient callback={onOkPress} {...props}>
      <View style={container}>{convert ? <MeGiftBox /> : <MRPGiftBox />}</View>
      <AppText
        variant="heading4"
        style={[
          gotRewardText,
          {color: convert ? primaryColor : secondaryColor},
        ]}>
        <FormattedMessage
          id="you_got_reward"
          values={{
            reward_type: rewardName,
          }}
        />
      </AppText>
      {convert ? (
        <TransactionAmount
          amount={convertedRewardAmount}
          unitVariant={ME}
          unitSizeVariant="normal"
          amountSizeVariant="largeProportional"
          amountColor={primaryColor}
          unitColor={primaryColor}
          style={centered}
        />
      ) : (
        <TransactionAmount
          amount={rewardAmount}
          unitVariant={REWARD_DOLLAR}
          unitSizeVariant="normal"
          amountSizeVariant="largeProportional"
          amountColor={secondaryColor}
          unitColor={secondaryColor}
          style={centered}
        />
      )}
      {convert && (
        <View style={convertedContainer}>
          <AppText variant="body2" style={convertedText(theme)}>
            <FormattedMessage id="converted_from" />{' '}
          </AppText>
          <TransactionAmount
            amount={rewardAmount}
            unitVariant={REWARD_DOLLAR}
            unitSizeVariant="small"
            amountSizeVariant="normal"
            amountColor={theme.colors.textOnBackground.disabled}
            unitColor={theme.colors.textOnBackground.disabled}
            style={centered}
          />
        </View>
      )}
    </PopupModalWithLinearGradient>
  );
};

RewardGotPopup.defaultProps = {
  convert: false,
  rewardName: <FormattedMessage id="reward_type_default" />,
  rewardAmount: 0,
};

export default RewardGotPopup;
