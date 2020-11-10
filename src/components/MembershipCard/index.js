import React from 'react';
import {Image} from 'react-native';

import {image} from './style';

import membershipLevel from '@/enum/membershipLevel';

const levelCardList = [
  {
    level: membershipLevel.NEWBIE,
    card: require('@/assets/newbie_card.png'),
  },
  {
    level: membershipLevel.STARTER,
    card: require('@/assets/starter_card.png'),
  },
  {
    level: membershipLevel.EXTRA,
    card: require('@/assets/extra_card.png'),
  },
  {
    level: membershipLevel.ELITE,
    card: require('@/assets/elite_card.png'),
  },
  {
    level: membershipLevel.INFINITE,
    card: require('@/assets/infinite_card.png'),
  },
  {
    level: membershipLevel.INFINITE_PRIVILEGE,
    card: require('@/assets/infinite_privilege_card.png'),
  },
];

const MembershipCard = ({userLevel, style}) => {
  return (
    <Image
      source={
        levelCardList.find((levelCard) => userLevel === levelCard.level)?.card
      }
      style={[image, style]}
    />
  );
};

export default MembershipCard;
