import React, {Fragment, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FormattedMessage} from 'react-intl';

import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import {GET_USER_TASK_GROUPS_AND_REWARD_API} from '@/api/data';

import {MarginBottom, ScrollContainer, TaskListContainer} from './style';

import ScreenContainer from '@/components/ScreenContainer';
import LinearGradientBackground from '@/components/LinearGradientBackground';
import BonusBox from '@/components/BonusBox';
import NoMoreContent from '@/components/NoMoreContent';
import DailyCheckIn from '@/components/DailyCheckIn';
import TaskList from '@/components/TaskList';

const BonusScreen = (props) => {
  const {data, refetch} = useQueryWithAuth(GET_USER_TASK_GROUPS_AND_REWARD_API);

  const userRewardList = data?.userProfile?.rewards;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const handleOnClaimPress = () => {
    refetch();
  };

  return (
    <LinearGradientBackground>
      <ScreenContainer hasTopBar headerTransparent>
        <ScrollContainer>
          <BonusBox
            title={<FormattedMessage id="check_in_task" />}
            detail={<FormattedMessage id="check_in_task_detail" />}
            children={<DailyCheckIn />}
          />
          <MarginBottom />
          {data?.userProfile?.taskGroups.map(
            ({name, description, userTasks}, index) => (
              <Fragment key={name}>
                <BonusBox
                  title={name}
                  detail={description}
                  icon={require('@/assets/daily_task_icon.png')}
                  children={
                    <TaskListContainer>
                      <TaskList
                        taskList={userTasks}
                        userRewardList={userRewardList}
                        onClaimPress={handleOnClaimPress}
                      />
                    </TaskListContainer>
                  }
                />
                {index !== data?.userProfile?.taskGroups.length - 1 && (
                  <MarginBottom />
                )}
              </Fragment>
            ),
          )}
          <NoMoreContent />
        </ScrollContainer>
      </ScreenContainer>
    </LinearGradientBackground>
  );
};

export default BonusScreen;
