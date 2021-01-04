import React, {useState, useLayoutEffect} from 'react';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'react-intl';
import {View, ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';

import AppIcon from '@/components/AppIcon';
import StakeMdt from '@/components/StakeMdt';
import DepositMdt from '@/components/DepositMdt';
import CryptoExchanges from '@/components/CryptoExchanges';
import ConfirmStakeModal from '@/components/ConfirmStakeModal';

import {GET_CURRENCY_BALANCE_API, UPDATE_STAKING_PLAN} from '@/api/data';
import {MEASURABLE_DATA_TOKEN} from '@/constants/currency';
import LoadingSpinner from '@/components/LoadingSpinner';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithAuth from '@/hooks/useMutationWithAuth';

import LockIcon from '@/assets/icon_lock.svg';
import AlertIcon from '@/assets/icon_alert-triangle.svg';

import {
  marginTop,
  sectionContainer,
  lowerHalfSectionContainer,
  stakeAmount as stakeAmountText,
  icon,
  center,
  availableMdtContainer,
  notEnought,
  alert,
  textAlignCenter,
  alertContainer,
  mediumEmphasis,
  rowContainer,
} from './style';

const AvailableMDT = ({amount}) => {
  const theme = useTheme();
  return (
    <View style={availableMdtContainer(theme)}>
      <TransactionAmount
        amount={amount}
        unitVariant={MEASURABLE_DATA_TOKEN}
        unitColor={theme.colors.primary.normal}
        unitSizeVariant="small"
        amountSizeVariant="normal"
        amountColor={theme.colors.textOnBackground.mediumEmphasis}
        style={center}
      />
    </View>
  );
};

const StackScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {data, loading} = useQueryWithAuth(GET_CURRENCY_BALANCE_API, {
    variables: {currencyCode: MEASURABLE_DATA_TOKEN},
  });
  const [showConfirmStakeModal, setShowConfirmStakeModal] = useState(false);
  const stakingPlan = route.params;

  const [updateStakingPlan] = useMutationWithAuth(UPDATE_STAKING_PLAN, {
    variables: {id: stakingPlan.id},
  });
  const availableMdt = data?.userProfile?.currencyAccounts[0]?.balance || 0;
  //TODO: It will need to switch wallet in the future
  const address = data?.userProfile?.currencyAccounts[0]?.wallets.filter(
    (w) => w.type === 'eth',
  )[0].address;

  const stakeAmount = stakingPlan.amount;
  const stakeDate = new Date();
  const expectedAvailableDate = new Date().setDate(
    stakeDate.getDate() + stakingPlan.lockupPeriodInDay || 0,
  );
  const remainingUnstakeAmount = availableMdt - stakeAmount;
  const isStakeAvailable = remainingUnstakeAmount >= 0;

  const handleConfirmStakePress = async () => {
    try {
      const result = await updateStakingPlan();
      if (result) {
        setShowConfirmStakeModal(true);
      }
    } catch (e) {
      // TODO: handle error
    }
  };

  const handleConfirmPress = () => {
    setShowConfirmStakeModal(false);
    navigation.pop();
  };

  useLayoutEffect(() => {
    // TODO: refactor theme object base on new design system later
    // TODO: resize the modal height to perform half-screen modal?
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowColor: 'transparent',
        backgroundColor: theme.colors.background1,
      },
      cardStyle: {
        backgroundColor: theme.colors.background4,
      },
      headerRight: () => <AvailableMDT amount={availableMdt} />,
    });
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView>
      <View style={lowerHalfSectionContainer(theme)}>
        <AppIcon
          color={theme.colors.background1}
          backgroundColor={theme.colors.primary.normal}
          sizeVariant="normal"
          svgIcon={LockIcon}
          style={[icon, center]}
        />
        <AppText variant="label" style={stakeAmountText(theme)}>
          <FormattedMessage id="stake_amount" defaultMessage="STAKE AMOUNT" />
        </AppText>
        <TransactionAmount
          amount={stakeAmount}
          unitVariant={MEASURABLE_DATA_TOKEN}
          unitColor={theme.colors.primary.normal}
          unitSizeVariant="small"
          amountSizeVariant="large"
          amountColor={theme.colors.textOnBackground.mediumEmphasis}
          showDecimal={false}
          style={center}
        />
        <View style={marginTop}>
          {isStakeAvailable ? (
            <StakeMdt
              stakingPlan={stakingPlan}
              remainingUnstakeAmount={remainingUnstakeAmount}
              expectedAvailableDate={expectedAvailableDate}
              stakeDate={stakeDate}
              onConfirmStakePress={handleConfirmStakePress}
            />
          ) : (
            <DepositMdt
              depositAmount={stakeAmount - availableMdt}
              detail={
                <View style={alertContainer(theme)}>
                  <View style={[rowContainer, alert]}>
                    <AlertIcon
                      fill={theme.colors.textOnError.normal}
                      stroke={theme.colors.textOnError.normal}
                      strokeWidth={2}
                    />
                    <AppText variant="subTitle3" style={notEnought(theme)}>
                      <FormattedMessage
                        id="you_dont_have_enought_mdt"
                        defaultMessage="You don’t have enough MDT"
                      />
                    </AppText>
                  </View>
                  <AppText
                    variant="body2"
                    style={[mediumEmphasis(theme), textAlignCenter]}>
                    <FormattedMessage
                      id="you_can_stake_after_transfer_mdt_to_deposit_address"
                      defaultMessage="You can stake MDT after transfering {amount} MDT to the deposit address below."
                      values={{
                        amount: (
                          <FormattedNumber value={stakeAmount - availableMdt} />
                        ),
                      }}
                    />
                  </AppText>
                </View>
              }
              address={address}
            />
          )}
        </View>
      </View>
      {!isStakeAvailable && (
        <View style={sectionContainer(theme)}>
          <CryptoExchanges />
        </View>
      )}
      <ConfirmStakeModal
        visible={showConfirmStakeModal}
        amount={
          <TransactionAmount
            amount={stakeAmount}
            unitVariant={MEASURABLE_DATA_TOKEN}
            unitColor={theme.colors.textOnBackground.mediumEmphasis}
            unitSizeVariant="normal"
            amountSizeVariant="normal"
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
            showDecimal={false}
            style={center}
          />
        }
        expectedAvailableDate={<FormattedDate value={expectedAvailableDate} />}
        onConfirmPress={handleConfirmPress}
      />
    </ScrollView>
  );
};

export default StackScreen;
