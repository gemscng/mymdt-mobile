import React from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';

import {REWARD_DOLLAR} from '@/constants/currency';

import {card, centered, margin, day as dayStyle} from './style';
import TransactionAmount from '@/components/TransactionAmount';
import AppText from '@/components/AppText2';
import {useTheme} from 'emotion-theming';

const DayList = ({
  todayAndAfterRewards,
  today,
  checkedInToday,
  daysPresentInBadge,
  isEnglish,
  setTodayElementLayout,
}) => {
  const theme = useTheme();
  return (
    // TODO: special handle dark mode style for daily check in
    <>
      {todayAndAfterRewards &&
        todayAndAfterRewards.map((amount, index) => {
          const day = index + 1 + daysPresentInBadge;
          const isToday = day === today;
          const isTodayCheckedIn = isToday && checkedInToday;
          const passedDay = isTodayCheckedIn ? day <= today : day < today;

          return (
            <View
              key={index}
              onLayout={(event) => {
                if (isToday) {
                  const layout = event.nativeEvent.layout;
                  setTodayElementLayout({xAxis: layout.x, width: layout.width});
                }
              }}
              style={[
                card(theme, isToday),
                passedDay && {backgroundColor: theme.colors.secondary.normal},
              ]}>
              {isEnglish ? (
                <>
                  <AppText
                    variant="label"
                    style={[
                      dayStyle(theme),
                      isToday && {color: theme.colors.secondary.dark},
                      passedDay && {color: theme.colors.background1},
                    ]}>
                    <FormattedMessage id="day" defaultMessage="Day" />
                  </AppText>
                  <AppText
                    variant="digit36"
                    style={[
                      dayStyle(theme),
                      isToday && {color: theme.colors.secondary.dark},
                      passedDay && {color: theme.colors.background1},
                      margin,
                    ]}>
                    {day}
                  </AppText>
                </>
              ) : (
                <>
                  <AppText
                    variant="digit36"
                    style={[
                      dayStyle(theme),
                      isToday && {color: theme.colors.secondary.dark},
                      passedDay && {color: theme.colors.background1},
                    ]}>
                    {day}
                  </AppText>
                  <AppText
                    variant="label"
                    style={[
                      dayStyle(theme),
                      isToday && {color: theme.colors.secondary.dark},
                      passedDay && {color: theme.colors.background1},
                      margin,
                    ]}>
                    <FormattedMessage id="day" defaultMessage="Day" />
                  </AppText>
                </>
              )}
              <TransactionAmount
                amount={amount}
                unitVariant={REWARD_DOLLAR}
                unitSizeVariant="small"
                amountSizeVariant="normal"
                amountColor={
                  passedDay
                    ? theme.colors.textOnThemeBackground.highEmphasis
                    : theme.colors.textOnBackground.mediumEmphasis
                }
                unitColor={
                  passedDay
                    ? theme.colors.textOnThemeBackground.white60Opacity
                    : theme.colors.secondary.normal
                }
                style={centered}
                showDecimal={false}
              />
            </View>
          );
        })}
    </>
  );
};

export default DayList;
