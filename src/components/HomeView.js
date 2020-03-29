import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button, Layout} from '@ui-kitten/components';
import Spacer from './UI/Spacer';
import HomeTimer from './UI/HomeTimer';
import {VIEWS} from '../index';

const HomeView = ({ currentTimer, navigate }) => (
  <Layout style={styles.container}>
    <HomeTimer currentTimer={currentTimer} />
    <Button
      size='giant'
      status='success'
      style={styles.button}
      onPress={() => navigate(VIEWS.WASHING)}
    >
      Wash!
    </Button>
  </Layout>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 160,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 160,
    width: 332,
  }
});

HomeView.propTypes = {
  currentTimer: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default HomeView;
