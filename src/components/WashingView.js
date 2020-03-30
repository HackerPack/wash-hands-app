import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { Text } from '@ui-kitten/components';
import { StyleSheet, Alert } from 'react-native';
import GetReadyTimer from './UI/GetReadyTimer';
import WashingTimer from './UI/WashingTimer';
import { VIEWS } from '../index';
import { recordHandWash } from '../persistence/storage';
import NotificationService from '../notifications/NotificationService';

// Gets called when the notification comes in
const onNotification = notif => {
  Alert.alert(notif.title, notif.message);
};

const notification = new NotificationService(onNotification);

const STATES = {
  INITIAL: 'INITIAL',
  WASHING: 'WASHING',
  COMPLETE: 'COMPLETE',
};

const WashingView = ({ navigate }) => {
  const [currentState, setCurrentState] = React.useState(STATES.INITIAL);

  return (
    <Container style={styles.container}>
      <Content>
        {currentState === STATES.INITIAL && (
          <GetReadyTimer onAnimationComplete={() => setCurrentState(STATES.WASHING)} />
        )}
        {currentState === STATES.WASHING && (
          <WashingTimer
            onAnimationComplete={() => {
              setCurrentState(STATES.COMPLETE);
              navigate(VIEWS.SCORE);
              recordHandWash();
              notification.scheduleNotification(10);
            }}
          />
        )}
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
};

export default WashingView;
