import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import {banner} from './style';

const StakeToUpgradeBanner = ({navigation, style}) => {
  const handleBannerPress = () => {
    navigation.navigate('membership_detail', {showNextStaking: true});
  };

  return (
    <TouchableOpacity onPress={handleBannerPress} style={style}>
      <Image
        source={require('@/assets/stake_to_upgrade_banner.png')}
        style={banner}
      />
    </TouchableOpacity>
  );
};

export default StakeToUpgradeBanner;
