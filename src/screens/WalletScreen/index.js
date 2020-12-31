import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {TRANSACTIONS_QUERY, GET_USER_STAKING_INFO} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';
import {useTheme} from 'emotion-theming';
import Config from 'react-native-config';

import AppText from '@/components/AppText2';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import QuickActions from '@/components/QuickActions';

import ConvertIcon from '@/assets/convert_icon.svg';
// import GiftIcon from '@/assets/gift_icon.svg';
import WithdrawalIcon from '@/assets/icon_upload.svg';
import StakeMdtIcon from '@/assets/icon_download.svg';
// import MyMdtIcon from '@/assets/mymdt_icon.svg';
import {FormattedMessage} from 'react-intl';
import ScreenContainer from '@/components/ScreenContainer';
import LinearGradientBackground from '@/components/LinearGradientBackground';

import {
  REWARD_DOLLAR,
  MEASURABLE_DATA_TOKEN,
  ME,
  USD,
  USDT,
} from '@/constants/currency';

import ArrowIcon from '@/assets/list_arrow.svg';

import {
  container,
  scrollContainer,
  total,
  totalBalance as totalBalanceText,
  textAlignCenter,
  currenciesView,
  separator,
  currencyRow,
  currency,
  amount as amountStyle,
  amountContainer,
  arrow,
  spinner,
  // payout,
  sectionMargin,
} from './style';

const CurrencyAccountItem = ({
  loading,
  currencyName,
  amount,
  amountUnitVariant,
  usdAmount,
  style,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={[currencyRow(theme), style]} {...props}>
      <AppText variant="subTitle2" style={currency(theme)}>
        {currencyName}
      </AppText>
      {loading ? (
        <LoadingSpinner style={spinner} />
      ) : (
        <View style={amountContainer}>
          <TransactionAmount
            amount={amount}
            amountSizeVariant="normal"
            unitSizeVariant="small"
            unitVariant={amountUnitVariant}
            unitColor={theme.colors.secondary.dark}
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
            style={amountStyle}
          />
          <TransactionAmount
            amount={usdAmount}
            amountSizeVariant="small"
            unitSizeVariant="small"
            unitVariant={USDT}
            showDollarSign
            showAlmostEqual
            unitColor={theme.colors.textOnBackground.mediumEmphasis}
            amountColor={theme.colors.textOnBackground.mediumEmphasis}
            style={amountStyle}
          />
        </View>
      )}
      <ArrowIcon
        stroke={theme.colors.textOnBackground.mediumEmphasis}
        style={arrow}
      />
    </TouchableOpacity>
  );
};

const WalletScreen = ({navigation}) => {
  const theme = useTheme();
  const {data, loading, refetch} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
  });

  const {
    data: userStakingInfoData,
    loading: userStakingInfoLoading,
  } = useQueryWithAuth(GET_USER_STAKING_INFO);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const rdAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === REWARD_DOLLAR,
    )?.balance || 0;

  const mdtAvailableAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === MEASURABLE_DATA_TOKEN,
    )?.balance || 0;

  const staking = userStakingInfoData?.userProfile?.staking?.[0];
  const mdtStakingAmount = staking?.stakingPlan
    ? staking.stakingPlan.amount
    : 0;
  const mdtTotalAmount = mdtAvailableAmount + mdtStakingAmount;

  const meAmount =
    data?.userProfile?.currencyAccounts.find((ca) => ca.currencyCode === ME)
      ?.balance || 0;
  const {conversionRate: rdToUsdRate} = useCurrencyConvertToUsd(REWARD_DOLLAR);
  const {conversionRate: mdtToUsdRate} = useCurrencyConvertToUsd(
    MEASURABLE_DATA_TOKEN,
  );
  const {conversionRate: meToUsdRate} = useCurrencyConvertToUsd(ME);
  const rdToUsdAmount = rdAmount * rdToUsdRate;
  const mdtToUsdAmount = mdtTotalAmount * mdtToUsdRate;
  const meToUsdAmount = meAmount * meToUsdRate;
  const totalBalance = rdToUsdAmount + mdtToUsdAmount + meToUsdAmount;

  const quickActionList = [
    {
      name: 'Stake MDT',
      icon: StakeMdtIcon,
      action: () =>
        navigation.navigate('membership_detail', {showNextStaking: true}),
    },
    ...(Config.EXPERIMENTAL_FEATURE === 'true'
      ? [
          {
            name: 'Withdraw',
            icon: WithdrawalIcon,
            action: () => navigation.navigate('settings'),
          },
        ]
      : []),
    {
      name: 'Convert',
      icon: ConvertIcon,
      action: () =>
        navigation.navigate('converter', {
          initialFrom: ME,
          initialTo: REWARD_DOLLAR,
        }),
    },
  ];

  const handleMrpPress = () => {
    navigation.navigate('mrp_detail');
  };

  const handleMdtPress = () => {
    navigation.navigate('mdt_detail');
  };

  const handleNewTokenPress = () => {
    navigation.navigate('newToken_detail');
  };

  return (
    <LinearGradientBackground
      colors={[
        theme.colors.secondary.walletBackground,
        theme.colors.secondary.walletBackground,
      ]}>
      <ScreenContainer
        hasTopBar
        headerTransparent
        style={scrollContainer(theme)}>
        <ScrollView>
          <View style={container(theme)}>
            <AppText variant="label" style={[total(theme), textAlignCenter]}>
              <FormattedMessage
                id="total_balance"
                defaultMessage="total balance"
              />
            </AppText>
            {loading || userStakingInfoLoading ? (
              <LoadingSpinner color={theme.colors.background1} />
            ) : (
              <TransactionAmount
                amount={totalBalance}
                showDollarSign
                amountSizeVariant="largeProportional"
                unitColor={theme.colors.textOnThemeBackground.highEmphasis}
                unitVariant={USD}
                amountColor={theme.colors.textOnThemeBackground.highEmphasis}
                style={totalBalanceText}
              />
            )}
          </View>
          <View style={currenciesView(theme)}>
            <CurrencyAccountItem
              loading={loading}
              currencyName={
                <FormattedMessage
                  id="currencyDisplayCode.RD"
                  defaultMessage="Reward Dollar"
                />
              }
              amount={rdAmount}
              amountUnitVariant={REWARD_DOLLAR}
              usdAmount={rdToUsdAmount}
              onPress={handleMrpPress}
            />
            <View style={separator(theme)} />
            <CurrencyAccountItem
              loading={loading || userStakingInfoLoading}
              currencyName={
                <FormattedMessage
                  id="currencyDisplayCode.MDT"
                  defaultMessage="MDT"
                />
              }
              amount={mdtTotalAmount}
              amountUnitVariant={MEASURABLE_DATA_TOKEN}
              usdAmount={mdtToUsdAmount}
              onPress={handleMdtPress}
            />
            <View style={separator(theme)} />
            <CurrencyAccountItem
              loading={loading}
              currencyName={
                <FormattedMessage
                  id="currencyDisplayCode.ME"
                  defaultMessage="ME"
                />
              }
              amount={meAmount}
              amountUnitVariant={ME}
              usdAmount={meToUsdAmount}
              onPress={handleNewTokenPress}
            />
          </View>
          <QuickActions actionList={quickActionList} style={sectionMargin} />
        </ScrollView>
      </ScreenContainer>
    </LinearGradientBackground>
  );
};

export default WalletScreen;
