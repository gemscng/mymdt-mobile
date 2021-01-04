import React from 'react';
import {FormattedMessage} from 'react-intl';
import {View, ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import DepositMdt from '@/components/DepositMdt';
import CryptoExchanges from '@/components/CryptoExchanges';
import StakeToUpgradeBanner from '@/components/StakeToUpgradeBanner';

import {GET_CURRENCY_BALANCE_API} from '@/api/data';
import {MEASURABLE_DATA_TOKEN} from '@/constants/currency';
import LoadingSpinner from '@/components/LoadingSpinner';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';

import {
  marginTop,
  lowerHalfSectionContainer,
  mediumEmphasis,
  banner,
} from './style';

const DepositScreen = ({navigation}) => {
  const theme = useTheme();
  const {data, loading} = useQueryWithAuth(GET_CURRENCY_BALANCE_API, {
    variables: {currencyCode: MEASURABLE_DATA_TOKEN},
  });

  const address = data?.userProfile?.currencyAccounts[0]?.wallets.filter(
    (w) => w.type === 'eth',
  )[0].address;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView>
      <View style={lowerHalfSectionContainer(theme)}>
        <DepositMdt
          detail={
            <AppText variant="body2" style={mediumEmphasis(theme)}>
              <FormattedMessage
                id="deposit_detail"
                defaultMessage="Depositing MDT in RewardMe is easy. Transfer MDT from any crypto exchange to the deposit address below."
              />
            </AppText>
          }
          address={address}
        />
      </View>
      <View style={[lowerHalfSectionContainer(theme), marginTop]}>
        <CryptoExchanges />
      </View>
      <StakeToUpgradeBanner
        navigation={navigation}
        style={[banner, marginTop]}
      />
    </ScrollView>
  );
};

export default DepositScreen;
