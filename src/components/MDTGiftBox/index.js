import React from 'react';

import LottieView from 'lottie-react-native';
import {animation} from './style';

const MDTGiftBox = () => (
  <LottieView
    source={require('./get_mdt.json')}
    resizeMode="contain"
    autoPlay
    loop
    style={animation}
  />
);

export default MDTGiftBox;
