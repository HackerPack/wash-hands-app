import React from 'react';
import PropTypes from 'prop-types';
import {Container, Content} from 'native-base';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import GetReadyTimer from './UI/GetReadyTimer'
import WashingTimer from './UI/WashingTimer';
import {VIEWS} from '../index';

const STATES = {
  INITIAL: 'INITIAL',
  WASHING: 'WASHING',
  COMPLETE: 'COMPLETE',
}

const WashingView = ({ navigate, resetTimer }) => {
  const [currentState, setCurrentState] = React.useState(STATES.INITIAL)

  return (
    <Container style={styles.container}>
      <Content>
        {currentState === STATES.INITIAL &&
          <GetReadyTimer
            onAnimationComplete={() => setCurrentState(STATES.WASHING)} />
        }
        {currentState === STATES.WASHING &&
          <WashingTimer
            onAnimationComplete={() => {
              setCurrentState(STATES.COMPLETE);
              navigate(VIEWS.HOME);
              resetTimer();
            }} />
        }
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
});

WashingView.propTypes = {
  navigate: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

export default WashingView;
