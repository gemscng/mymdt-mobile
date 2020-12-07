import React from 'react';
import {View, ScrollView} from 'react-native';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';
import Config from 'react-native-config';
import {FormattedMessage} from 'react-intl';

import {TRANSACTIONS_QUERY} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import AppText from '@/components/AppText2';
import AppButton from '@/components/AppButton';
import TransactionAmount from '@/components/TransactionAmount';
import LoadingSpinner from '@/components/LoadingSpinner';
import {USD, ME} from '@/constants/currency';
import WithdrawalIcon from '@/assets/icon_upload.svg';
import DepositIcon from '@/assets/icon_download.svg';
import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';

import NextStakeReward from './NextStakeReward';
import NewTokenTransactionHistory from './NewTokenTransactionHistory';
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
  sectionMargin,
} from './style';

const NewTokenDetailScreen = ({navigation}) => {
  const theme = useTheme();
  const currencyCode = ME;
  const {conversionRate} = useCurrencyConvertToUsd(ME);
  const {data, loading} = useQueryWithAuth(TRANSACTIONS_QUERY, {
    fetchPolicy: 'network-only',
    variables: {
      currencyCode: currencyCode,
      first: 5,
    },
  });

  const newTokenAmount =
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
            backgroundColor={theme.colors.secondary.normal}
            svgIcon={transactionTypeToIcon(transaction.node?.type)}
          />
        ),
      }),
  );

  return (
    <ScrollView>
      <SafeAreaView style={container(theme)}>
        <AppText variant="label" style={[total(theme), textAlignCenter]}>
          <FormattedMessage id="currencyDisplayCode.ME" defaultMessage="ME" />{' '}
          <FormattedMessage id="total_balance" defaultMessage="total balance" />
        </AppText>
        {loading ? (
          <LoadingSpinner color={theme.colors.background1} />
        ) : (
          <>
            <TransactionAmount
              amount={newTokenAmount}
              amountSizeVariant="largeProportional"
              amountColor={theme.colors.textOnThemeBackground.highEmphasis}
              unitVariant={ME}
              unitColor={theme.colors.textOnThemeBackground.highEmphasis}
              style={totalBalanceText}
            />
            <TransactionAmount
              amount={newTokenAmount * conversionRate}
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
              colorVariant="secondaryDark"
              text="withdraw"
              svgIcon={WithdrawalIcon}
              style={marginRight}
              disabled={newTokenAmount <= 0}
            />
            <AppButton
              variant="filled"
              sizeVariant="normal"
              colorVariant="secondaryDark"
              text="deposit"
              svgIcon={DepositIcon}
            />
          </View>
        )}
      </SafeAreaView>
      {Config.EXPERIMENTAL_FEATURE === 'true' && (
        <NextStakeReward style={sectionMargin} />
      )}
      <NewTokenTransactionHistory
        navigation={navigation}
        currencyCode={currencyCode}
        transactionsHistoryList={first5TransactionsHistory}
        style={sectionMargin}
      />
    </ScrollView>
  );
};

export default NewTokenDetailScreen;
