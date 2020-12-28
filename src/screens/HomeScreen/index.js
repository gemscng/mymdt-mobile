import React, {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {FormattedMessage} from 'react-intl';
import {GET_CHECK_USER_CAN_UPGRADE_DATA, GET_MERCHANTS_API} from '@/api/data';

import membershipLevel from '@/enum/membershipLevel';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import MembershipCard from '@/components/MembershipCard';
import QuickActions from '@/components/QuickActions';
import UpgradeSection from './UpgradeSection';
import CashBackSummarySection from './CashBackSummarySection';
import MembershipInfoCard from './MembershipInfoCard';
import ScreenContainer from '@/components/ScreenContainer';

import AwardIcon from '@/assets/icon_award.svg';
import CreditCardIcon from '@/assets/icon_credit-card.svg';
import DollarSignIcon from '@/assets/dollar_sign_icon.svg';
import BagIcon from '@/assets/icon_shopping-bag.svg';
import ReferralIcon from '@/assets/referral_icon.svg';
import MailIcon from '@/assets/icon_mail.svg';

import {
  container,
  imageStyle,
  upgradeSection,
  sectionMargin,
  cardContainer,
} from './style';
import {useTheme} from 'emotion-theming';

import LoadingSpinner from '@/components/LoadingSpinner';

import {AUTH_TOKENS} from '@/api/auth';
import {useQuery} from '@apollo/client';
import useSWR from 'swr';

import {ME} from '@/constants/currency';

import useCurrencyConvertToUsd from '@/hooks/useCurrencyConvertToUsd';

import Config from 'react-native-config';
const url = `${Config.DISTRIBUTE_API_SCHEME}://${Config.DISTRIBUTE_API_ENDPOINT}/cashback/summary?period=7`;

const HomeScreen = ({navigation}) => {
  const theme = useTheme();
  const {data, loading, refetch} = useQueryWithAuth(
    GET_CHECK_USER_CAN_UPGRADE_DATA,
  );
  const {conversionRate} = useCurrencyConvertToUsd(ME);
  const {
    data: merchantsData,
    loading: merchantsLoading,
    error: merchantsError,
  } = useQueryWithAuth(GET_MERCHANTS_API);

  const referFriendCount =
    data?.userProfile?.referrals.filter(
      (referral) => referral.isReferrer && referral.status === 'PROCESSED',
    ).length || 0;
  const bindEmailCount = data?.userProfile?.emailAccounts?.length || 0;
  const bindCardCount = data?.userProfile?.bankItems?.length || 0;
  const bindDataSourceCount = bindEmailCount + bindCardCount;
  const currentStakeAmount =
    data?.userProfile?.staking[0]?.stakingPlan.amount || 0;

  const userLevel = data?.userProfile?.membership?.level || 0;
  const availableMemberships = data?.userProfile?.availableMemberships || [];
  const maximumLevel =
    availableMemberships[availableMemberships.length - 1]?.level;
  const userNextLevel = userLevel === maximumLevel ? userLevel : userLevel + 1;
  const nextLevelMembership = availableMemberships.find(
    (ams) => ams.level === userNextLevel,
  );

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const {data: authData} = useQuery(AUTH_TOKENS);
  const fetcher = async (...args) => {
    const res = await fetch(...args, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
    });

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }

    return res.json();
  };

  const {data: summaryData, error: summaryError} = useSWR(url, fetcher);
  const isSummaryLoading = !summaryData && !summaryError;
  const cashBackTotal = summaryData?.data?.totalCashback * conversionRate || 0;
  const cashBackTotalInPeriod =
    summaryData?.data?.totalCashbackInPeriod * conversionRate || 0;
  // TODO: handle error

  const quickActionList = [
    {
      name: <FormattedMessage id="privileges" defaultMessage="Privileges" />,
      icon: AwardIcon,
      action: () => navigation.navigate('membership_detail'),
    },
    {
      name: <FormattedMessage id="add_email" defaultMessage="Add Email" />,
      icon: MailIcon,
      action: () =>
        navigation.navigate('settings', {screen: 'linked_emails_setting'}),
    },
    {
      name: <FormattedMessage id="add_card" defaultMessage="Add Card" />,
      icon: CreditCardIcon,
      action: () =>
        navigation.navigate('settings', {screen: 'linked_cards_setting'}),
    },
    {
      name: <FormattedMessage id="referral" defaultMessage="Referral" />,
      icon: ReferralIcon,
      action: () => navigation.navigate('referral'),
    },
    {
      name: (
        <FormattedMessage
          id="selected_merchants"
          defaultMessage="Selected Merchants"
        />
      ),
      icon: BagIcon,
      action: () =>
        navigation.navigate('settings', {screen: 'offers_preference_edit'}),
    },
    {
      name: (
        <FormattedMessage id="cashback_type" defaultMessage="Cashback type" />
      ),
      icon: DollarSignIcon,
      action: () => navigation.navigate('choose_cash_back_type_setting'),
    },
  ];

  const levelGradientMap = {
    [membershipLevel.NEWBIE]: {
      gradient: theme.colors.membership.newbie.dashboard.gradient,
    },
    [membershipLevel.STARTER]: {
      gradient: theme.colors.membership.starter.dashboard.gradient,
    },
    [membershipLevel.EXTRA]: {
      gradient: theme.colors.membership.extra.dashboard.gradient,
    },
    [membershipLevel.ELITE]: {
      gradient: theme.colors.membership.elite.dashboard.gradient,
    },
    [membershipLevel.INFINITE]: {
      gradient: theme.colors.membership.infinite.dashboard.gradient,
    },
    [membershipLevel.INFINITE_PRIVILEGE]: {
      gradient: theme.colors.membership.infinite_privilege.dashboard.gradient,
    },
  };

  const handleCashBackSummaryPress = () => {
    if (summaryData) {
      navigation.navigate('cash_back_summary', {
        cashBackTotal: cashBackTotal,
        cashBackTotalInPeriod: cashBackTotalInPeriod,
      });
    }
  };

  const handleViewMorePress = () => {
    navigation.navigate('membership_detail', {showNextLevel: true});
  };

  const handleMembershipCardPress = () => {
    navigation.navigate('membership_detail');
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  // TODO: linear gradient should not across the whole scroll view
  // TODO: add card scaled shadow

  return (
    <LinearGradientBackground colors={levelGradientMap[userLevel].gradient}>
      <ScreenContainer hasTopBar headerTransparent>
        <ScrollView>
          <TouchableOpacity
            onPress={handleMembershipCardPress}
            style={cardContainer}>
            <MembershipCard userLevel={userLevel} style={imageStyle} />
          </TouchableOpacity>
          <View style={container(theme)}>
            {userLevel !== maximumLevel && (
              <UpgradeSection
                userNextLevel={userNextLevel}
                navigation={navigation}
                style={[upgradeSection, sectionMargin]}
                membership={nextLevelMembership}
                referFriendCount={referFriendCount}
                bindDataSourceCount={bindDataSourceCount}
                currentStakeAmount={currentStakeAmount}
              />
            )}
            <QuickActions
              style={[
                sectionMargin,
                userLevel === maximumLevel && upgradeSection,
              ]}
              actionList={quickActionList}
            />
            {merchantsLoading || isSummaryLoading ? (
              <LoadingSpinner />
            ) : merchantsError || summaryError ? null : (
              <CashBackSummarySection
                navigation={navigation}
                onPress={handleCashBackSummaryPress}
                style={sectionMargin}
                merchantsData={merchantsData?.merchants}
                summaryData={summaryData}
                meToUseConversionRate={conversionRate}
              />
            )}
            <MembershipInfoCard
              userLevel={userLevel}
              style={sectionMargin}
              onPress={handleViewMorePress}
            />
          </View>
        </ScrollView>
      </ScreenContainer>
    </LinearGradientBackground>
  );
};

export default HomeScreen;
