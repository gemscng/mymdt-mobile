import React, {
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import {VirtualizedList, TouchableOpacity, Image, View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedNumber} from 'react-intl';
import {ME} from '@/constants/currency';
import {GET_MERCHANTS_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import {AUTH_TOKENS} from '@/api/auth';
import {useQuery} from '@apollo/client';

import LinearGradient from 'react-native-linear-gradient';
import {
  image,
  banner,
  body,
  chip,
  currency as currencyStyle,
  amount as amountStyle,
  range as rangeStyle,
  firstChipMargin,
  historyHeaderContainer,
  cashBackTitle,
  background as historyBackground,
} from './style';

import {ThemeContext} from '@/context/theme';
import AppIcon from '@/components/AppIcon';
import AppText from '@/components/AppText2';
import MissingCartIcon from '@/assets/icon_missed-shopping-cart.svg';
// import TransactionBottomSheet from '@/components/TransactionBottomSheet';

import TransactionsHistory from '@/components/TransactionsHistory';
// import AppButton from '@/components/AppButton';
import BrandIcon from '@/components/BrandIcon';
import {FormattedMessage} from 'react-intl';

import {useSWRInfinite} from 'swr';

import Config from 'react-native-config';
const url = `${Config.DISTRIBUTE_API_SCHEME}://${Config.DISTRIBUTE_API_ENDPOINT}/cashback/histories`;

const getKey = (pageIndex, previousPageData) => {
  // reached the end
  if (previousPageData && !previousPageData.data) {
    return null;
  }
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) {
    return `${url}?first=10`;
  }
  // add the cursor to the API endpoint
  return `${url}?after=${previousPageData.endCursor}&first=10`;
};

const SummaryChip = ({currency, amount, range, style}) => {
  const theme = useTheme();
  return (
    <View style={[chip(theme), style]}>
      <AppText variant="unit11" style={currencyStyle(theme)}>
        {currency}
      </AppText>
      <AppText variant="digit16mono" style={amountStyle(theme)}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </AppText>
      <AppText variant="smallText" style={rangeStyle(theme)}>
        {range}
      </AppText>
    </View>
  );
};

const CashBackSummaryScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {isDark} = useContext(ThemeContext);
  const {cashBackTotal, cashBackTotalInPeriod} = route.params;
  const backgroundImg = isDark
    ? require('@/assets/cashback-history-background_dark.png')
    : require('@/assets/cashback-history-background.png');
  // const [showBottomSheet, setShowBottomSheet] = useState(false);
  // const [activeFilterSectionIndex, setActiveFilterSectionIndex] = useState(0);
  // const [activeFilterItemIndex, setActiveFilterItemIndex] = useState(null);
  const [cashBackHistoryList, setCashBackHistoryList] = useState([]);

  const {data: merchantsData, loading: merchantsLoading} = useQueryWithAuth(
    GET_MERCHANTS_API,
  );
  const {data: authData} = useQuery(AUTH_TOKENS);

  const fetcher = (...args) =>
    fetch(...args, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    }).then((res) => res.json());

  const {data: fetchedCashBackData} = useSWRInfinite(getKey, fetcher);

  const currencyCode = ME;

  // TODO: handle pagination

  const cashBackHistoryRawList = useMemo(
    () =>
      !!fetchedCashBackData &&
      fetchedCashBackData[0].data?.edges.map(
        (h) =>
          (h = {
            cursor: h.cursor,
            icon: merchantsLoading ? (
              <LoadingSpinner />
            ) : (
              <BrandIcon
                sizeVariant="small"
                ImgSrc={{
                  uri: merchantsData?.merchants.find(
                    (merchant) => merchant.id === h.node.merchant_id,
                  )?.logo,
                }}
              />
            ),
            node: {
              amount: h.node.cashback,
              cashbackRate: h.node.cashback_rate,
              cashbackCurrencyCode: h.node.cashback_currency_code,
              id: h.node.id,
              title: h.node.merchant,
              transactionTime: h.node.created_at,
              type: h.node.provider,
              data: {
                email: h.node.data?.account_email,
                senderEmail: h.node.data?.sender_email,
                emailSubject: h.node.data?.email_subject,
                receiveTime: h.node.data?.received_time * 1000,
                amount: h.node.data?.amount_usd || h.node.data?.amount,
                subType: h.node.data?.subType,
                mask: h.node.data?.mask,
              },
            },
          }),
      ),
    [fetchedCashBackData, merchantsData, merchantsLoading],
  );

  useEffect(() => {
    setCashBackHistoryList(cashBackHistoryRawList);
  }, [cashBackHistoryRawList]);

  // const dataByMerchants = [];
  // const dataByEmails = [];
  // const dataByBanks = {};

  // const filterList = [
  //   {title: 'Cashback from Selected Merchants', data: dataByMerchants},
  //   {title: 'Cashback from Emails', data: dataByEmails},
  //   {title: 'Cashback from Bank accounts', data: dataByBanks},
  // ];

  // const handleFilterPress = () => {
  //   setShowBottomSheet(true);
  // };

  // const handleLayoutPress = () => {
  //   setShowBottomSheet(false);
  // };

  // const handleItemPress = (index, itemIndex) => {
  //   setActiveFilterSectionIndex(index);
  //   setActiveFilterItemIndex(itemIndex);
  // };

  // const onApplyPress = () => {
  //   setShowBottomSheet(false);
  // };

  const onLoadMore = () => {};

  const handleMissingCartPress = useCallback(() => {
    navigation.navigate('missing_receipt');
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {backgroundColor: theme.colors.cashBackSummaryBackground},
      headerBackground: () => (
        <LinearGradient
          colors={theme.colors.linearGradientBackground.cashBackSummary}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleMissingCartPress}>
          <AppIcon
            sizeVariant="small"
            svgIcon={MissingCartIcon}
            color={theme.colors.contrastColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    handleMissingCartPress,
    theme.colors.linearGradientBackground.cashBackSummary,
    theme.colors.cashBackSummaryBackground,
    theme.colors.contrastColor,
  ]);

  return (
    <>
      <VirtualizedList
        getItemCount={() => 0}
        ListHeaderComponent={
          <>
            <Image source={backgroundImg} resizeMode="cover" style={image} />
            <View style={body}>
              <SummaryChip
                currency="USD"
                range={
                  <FormattedMessage
                    id="in_past_days"
                    defaultMessage="In Past {day} Days"
                    values={{
                      day: 7,
                    }}
                  />
                }
                amount={cashBackTotalInPeriod}
                style={firstChipMargin}
              />
              <SummaryChip
                currency="USD"
                range={
                  <FormattedMessage id="in_totals" defaultMessage="In Totals" />
                }
                amount={cashBackTotal}
              />
              <Image
                style={banner}
                source={require('@/assets/upgrade_promotion_banner.png')}
                resizeMode="cover"
              />
            </View>
          </>
        }
        ListFooterComponent={
          <TransactionsHistory
            headerComponent={
              <View style={historyHeaderContainer(theme)}>
                <AppText variant="heading5" style={cashBackTitle(theme)}>
                  <FormattedMessage
                    id="cash_back_history"
                    defaultMessage="Cash Back History"
                  />
                </AppText>
                {/* <AppButton
                  onPress={handleFilterPress}
                  variant="outlined"
                  sizeVariant="compact"
                  colorVariant="secondary"
                  text={<FormattedMessage id="button.filter" />}
                /> */}
              </View>
            }
            currencyCode={currencyCode}
            navigation={navigation}
            transactionsHistoryList={cashBackHistoryList}
            onEndReached={onLoadMore}
            style={historyBackground(theme)}
          />
        }
      />
      {/* {showBottomSheet && (
        <TransactionBottomSheet
          title={<FormattedMessage id="filter_by" defaultMessage="Filter by" />}
          items={filterList}
          activeOptionIndex={activeFilterSectionIndex}
          onLayoutPress={handleLayoutPress}
          onItemPress={handleItemPress}
          onApplyPress={onApplyPress}
        />
      )} */}
    </>
  );
};

export default CashBackSummaryScreen;
