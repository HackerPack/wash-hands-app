import React from 'react';
import PropTypes from 'prop-types';
import {Text} from '@ui-kitten/components';
import { Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import utils from '../../lib/utils'
import timeConstants from '../../constants/timeConstants';

const WashingTimer = ({ onAnimationComplete }) => {
  return (
    <AnimatedCircularProgress
      duration={timeConstants.WASHING_TIMER}
      size={200}
      width={10}
      fill={100}
      easing={Easing.linear}
      tintColor="#a9f29d"
      onAnimationComplete={onAnimationComplete}
      backgroundColor="#54784e"
    >
      {
        (fill) => (
          <>
            <Text category='s1'>Keep washing for</Text>
            <Text category='h1'>
              {utils.getTimeinSeconds(fill,timeConstants.WASHING_TIMER)}
            </Text>
            <Text category='s1'>seconds</Text>
          </>
        )
      }
    </AnimatedCircularProgress>
  );
};

WashingTimer.propTypes = {
  onAnimationComplete: PropTypes.func,
};

WashingTimer.defaultProps = {
  onAnimationComplete: () => {},
};

export default WashingTimer;
