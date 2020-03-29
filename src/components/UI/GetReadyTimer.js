import React from 'react';
import PropTypes from 'prop-types';
import {Text} from '@ui-kitten/components';
import { Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import utils from '../../lib/utils'

const GetReadyTimer = ({ onAnimationComplete }) => {
  const duration = 5000;

  return (
    <AnimatedCircularProgress
      duration={duration}
      size={200}
      width={10}
      fill={100}
      easing={Easing.linear}
      tintColor="#00e0ff"
      onAnimationComplete={onAnimationComplete}
      backgroundColor="#3d5875"
    >
      {
        (fill) => (
          <>
            <Text category='s1'>Get ready in</Text>
            <Text category='h1'>{utils.getTimeinSeconds(fill,duration)}</Text>
            <Text category='s1'>seconds</Text>
          </>
        )
      }
    </AnimatedCircularProgress>
  );
};

GetReadyTimer.propTypes = {
  onAnimationComplete: PropTypes.func,
};

GetReadyTimer.defaultProps = {
  onAnimationComplete: () => {},
};

export default GetReadyTimer;
