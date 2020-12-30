import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import Config from 'react-native-config';
import SafeAreaView from 'react-native-safe-area-view';
import {FormattedMessage} from 'react-intl';

import {TRANSACTIONS_QUERY, GET_USER_STAKING_INFO} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import {MEASURABLE_DATA_TOKEN, USD} from '@/constants/currency';
import WithdrawalIcon from '@/assets/icon_upload.svg';
import DepositIcon from '@/assets/icon_download.svg';
import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';

import MdtStake from './MdtStake';
import MdtTransactionHistory from './MdtTransactionHistory';
import transactionTypeToIcon from '@/utils/transactionTypeToIcon';

import AppAvator from '@/components/AppAvator';

import {
  container,
  total,
  totalBalance as totalBalanceText,
  textAlignCenter,
  amount,
  rowContainer,
  marginRight,
  banner,
  sectionMargin,
} from './style';

const MdtDetailScreen = ({navigation}) => {
  const theme = useTheme();
  const currencyCode = MEASURABLE_DATA_TOKEN;

  const {conversionRate} = useCurrencyConvertToUsd(MEASURABLE_DATA_TOKEN);
  const {data, loading} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      currencyCode: currencyCode,
      first: 5,
    },
  });
  const {
    data: userStakingInfoData,
    loading: userStakingInfoLoading,
  } = useQueryWithAuth(GET_USER_STAKING_INFO);

  const mdtAmount =
    data?.userProfile?.currencyAccounts.find(
      (ca) => ca.currencyCode === currencyCode,
    )?.balance || 0;

  const currentCardData = data?.userProfile?.currencyAccounts[0];
  const first5TransactionsHistory = currentCardData?.transactions?.edges.map(
    (transaction) =>
      (transaction = {
        ...transaction,
        icon: (
          <AppAvator
            variant="icon"
            sizeVariant="small"
            color={theme.colors.background1}
            backgroundColor={theme.colors.primary.normal}
            svgIcon={transactionTypeToIcon(transaction.node?.type)}
          />
        ),
      }),
  );

  // TODO: currently only one staking plan will exist. It can change in the future
  const staking = userStakingInfoData?.userProfile?.staking?.[0];
  let mdtTotalAmount =
    mdtAmount + (staking?.stakingPlan ? staking.stakingPlan.amount : 0);

  return (
    <ScrollView>
      <SafeAreaView style={container(theme)}>
        <AppText variant="label" style={[total(theme), textAlignCenter]}>
          <FormattedMessage id="currencyDisplayCode.MDT" defaultMessage="MDT" />{' '}
          <FormattedMessage id="total_balance" defaultMessage="total balance" />
        </AppText>
        {loading ? (
          <LoadingSpinner color={theme.colors.background1} />
        ) : (
          <>
            <TransactionAmount
              amount={mdtTotalAmount}
              amountSizeVariant="largeProportional"
              amountColor={theme.colors.textOnThemeBackground.highEmphasis}
              unitVariant={currencyCode}
              unitColor={theme.colors.textOnThemeBackground.highEmphasis}
              style={totalBalanceText}
            />
            <TransactionAmount
              amount={mdtTotalAmount * conversionRate}
              amountSizeVariant="small"
              unitSizeVariant="small"
              unitVariant={USD}
              showDollarSign
              showAlmostEqual
              unitColor={theme.colors.textOnThemeBackground.mediumEmphasis}
              amountColor={theme.colors.textOnThemeBackground.mediumEmphasis}
              style={amount}
            />
          </>
        )}
        {Config.EXPERIMENTAL_FEATURE === 'true' && (
          <View style={rowContainer}>
            <AppButton
              variant="filled"
              sizeVariant="normal"
              colorVariant="primaryDark"
              text="withdraw"
              svgIcon={WithdrawalIcon}
              style={marginRight}
              disabled={mdtAmount <= 0}
            />
            <AppButton
              variant="filled"
              sizeVariant="normal"
              colorVariant="primaryDark"
              text="deposit"
              svgIcon={DepositIcon}
            />
          </View>
        )}
      </SafeAreaView>
      {userStakingInfoLoading ? (
        <LoadingSpinner color={theme.colors.background1} />
      ) : staking ? (
        <MdtStake
          style={sectionMargin}
          mdtStakeAmount={staking.stakingPlan.amount}
          stakeDate={staking.stakeDate}
          lockupPeriodInDay={staking.stakingPlan.lockupPeriodInDay}
          paPercentage={staking.stakingPlan.interestRate}
          accuredRewardAmount={staking.payoutInfo.nextAmount}
          nextPayoutDate={staking.payoutInfo.nextPayoutDate}
          cumulativeRewardAmount={staking.payoutInfo.cumulativeAmount}
          availableMdt={mdtAmount}
        />
      ) : (
        <Image
          source={require('@/assets/stake_to_upgrade_banner.png')}
          style={banner}
        />
      )}
      <MdtTransactionHistory
        navigation={navigation}
        currencyCode={currencyCode}
        transactionsHistoryList={first5TransactionsHistory}
        style={sectionMargin}
      />
    </ScrollView>
  );
};

export default MdtDetailScreen;
