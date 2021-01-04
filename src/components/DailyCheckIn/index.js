import React, {useState, useContext, useRef, useEffect} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {FormattedMessage} from 'react-intl';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import useMutationWithReset from '@/hooks/useMutationWithReset';
import {GET_CHECK_IN_STATUS_API, CHECK_IN_API} from '@/api/data';
import {IntlContext} from '@/context/Intl';

import {margin, dayList, container, checkInButton} from './style';

import AppButton from '@/components/AppButton';
import RewardGotPopup from '@/components/RewardGotPopup';
import PopupModal from '@/components/PopupModal';
import DayList from './DayList';
import AchievementBadge from './AchievementBadge';

const {width: viewportWidth} = Dimensions.get('window');

const DailyCheckIn = () => {
  const [daysPresentInBadge, setDaysPresentInBadge] = useState(0);
  const [todayElementLayout, setTodayElementLayout] = useState(null);
  const {localeEnum} = useContext(IntlContext);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current && !!todayElementLayout) {
      scrollRef.current.scrollTo({
        x:
          todayElementLayout.xAxis -
          viewportWidth / 2 +
          todayElementLayout.width / 2,
      });
    }
  }, [todayElementLayout]);

  const {data, refetch} = useQueryWithAuth(GET_CHECK_IN_STATUS_API);

  const [
    checkIn,
    {data: checkInData, error: checkInError},
    reset,
  ] = useMutationWithReset(CHECK_IN_API, {}, {withAuth: true});

  const handleCheckInPress = async () => {
    try {
      await checkIn();
    } catch (e) {
      console.error(e);
    }
  };

  const isEnglish = localeEnum === 'EN_US';
  const today = data?.userProfile?.checkInStatus?.today;
  const checkedInToday = data?.userProfile?.checkInStatus?.hasCheckedInToday;
  const todayAndAfterRewards = data?.userProfile?.checkInStatus?.rewards || [];
  const todayRewardAmount =
    (todayAndAfterRewards && todayAndAfterRewards[today - 1]) || 0;
  const slicedRewardList =
    todayAndAfterRewards.slice(
      daysPresentInBadge,
      todayAndAfterRewards.length,
    ) || [];

  const handleRewardGotPress = () => {
    reset();
    refetch();
  };

  return (
    <View style={container}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={dayList}>
        <View style={margin} />
        <AchievementBadge
          day={checkedInToday ? today : today - 1}
          setDaysPresentInBadge={setDaysPresentInBadge}
          isEnglish={isEnglish}
        />
        <DayList
          daysPresentInBadge={daysPresentInBadge}
          today={today}
          checkedInToday={checkedInToday}
          todayAndAfterRewards={slicedRewardList}
          isEnglish={isEnglish}
          setTodayElementLayout={setTodayElementLayout}
        />
        <View style={margin} />
      </ScrollView>
      <AppButton
        onPress={handleCheckInPress}
        text={
          checkedInToday ? (
            <FormattedMessage
              id="button.checked_in"
              defaultMessage="Checked in"
            />
          ) : (
            <FormattedMessage id="button.check_in" defaultMessage="Check in" />
          )
        }
        disabled={checkedInToday}
        variant="filled"
        sizeVariant="normal"
        colorVariant="secondary"
        style={checkInButton}
      />
      <RewardGotPopup
        visible={!!checkInData}
        onOkPress={handleRewardGotPress}
        rewardName={<FormattedMessage id="reward_type_check_in" />}
        rewardAmount={todayRewardAmount}
      />
      <PopupModal
        visible={!!checkInError}
        title="Something went wrong!"
        detail="Please try again later"
        callback={reset}
      />
    </View>
  );
};

export default DailyCheckIn;
