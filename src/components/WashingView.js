import React from 'react';
import {Container, Content} from 'native-base';
import {Text} from '@ui-kitten/components';
import GetReadyTimer from './UI/GetReadyTimer'
import WashingTimer from './UI/WashingTimer';

const STATES = {
  INITIAL: 'INITIAL',
  WASHING: 'WASHING',
  COMPLETE: 'COMPLETE',
}

const WashingView = () => {
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
            onAnimationComplete={() => setCurrentState(STATES.COMPLETE)} />
        }
        {currentState === STATES.COMPLETE &&
          <Text category='h1'>DONE</Text>
        }
      </Content>
    </Container>
  );
};

const styles ={
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  }
}

export default WashingView;
