import React from 'react';

import LottieView from 'lottie-react-native';
import {animation} from './style';

const MeGiftBox = () => (
  <LottieView
    source={require('./get_me_token.json')}
    resizeMode="contain"
    autoPlay
    loop
    style={animation}
  />
);

export default MeGiftBox;
