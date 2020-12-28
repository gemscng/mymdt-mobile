import React from 'react';

import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width: viewportWidth} = Dimensions.get('window');

const MDTGiftBox = () => (
  <LottieView
    source={require('./get_me_token.json')}
    resizeMode="contain"
    autoPlay
    loop
    style={{
      width: viewportWidth,
    }}
  />
);

export default MDTGiftBox;
