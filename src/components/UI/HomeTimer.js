import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import utils from '../../lib/utils'
import timeConstants from '../../constants/timeConstants';


const HomeTimer = ({ currentTimer }) => {
  const color = currentTimer > timeConstants.HOME_WARNING_TIMER
    ? 'success'
    : (currentTimer > 0 ? 'warning' : 'danger');

  return (
    <Layout style={styles.container}>
      <Text style={styles.text} status={color}>
        {utils.formatSecondsToString(currentTimer)}
      </Text>
      <Text status={color} category='s1'>
        TILL YOUR NEXT WASH
      </Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 80,
    lineHeight:100,
    width: 332,
  },
});

HomeTimer.propTypes = {
  currentTimer: PropTypes.number.isRequired,
};

export default HomeTimer;
