import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, H1 } from 'native-base';
import { Text, Button, Layout } from '@ui-kitten/components';
import HistoryList from './History/HistoryList';
import Spacer from './UI/Spacer';
import * as Storage from '../persistence/storage';
import {VIEWS} from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    margin: 8,
  },
});

const extractTodaysTimeStamps = handWashEvents => {
  const today = new Date().toLocaleDateString();
  return handWashEvents
    .filter(
      handWashEventDate => today === new Date(handWashEventDate.timestamp).toLocaleDateString(),
    );
};
const ScoreView = ({ navigate }) => {
  const [history, setHistory] = useState({ today: [], allHistory: [] });

  useEffect(() => {
    async function fetchHistoryData() {
      const handWashHistory = await Storage.fetchHandWashHistory();
      const todaysTimeStamps = extractTodaysTimeStamps(handWashHistory);
      setHistory(prevHistory => ({
        ...prevHistory,
        today: todaysTimeStamps,
        allHistory: handWashHistory,
      }));
    }
    fetchHistoryData();
  }, []);
  return (
    <Container style={styles.container}>
      <Content padder style={styles.content}>
        <Spacer />
        <H1>Score: </H1>
        <Spacer size={10} />
        <Text> this is a test payload </Text>
        <Layout style={styles.buttonGroup}>
          <Button style={styles.button}>Share</Button>
          <Button
            style={styles.button}
            status='basic'
            onPress={() => navigate(VIEWS.HOME)}
          >
            Back to Home
          </Button>
        </Layout>
        <Spacer size={30} />
        <H1 style={{}}>Today</H1>
        <Spacer size={10} />
        <HistoryList handWashHistory={history.today} onlyTime />
        <Spacer size={30} />
        <H1 style={{}}>All History</H1>
        <HistoryList handWashHistory={history.allHistory} />
      </Content>
    </Container>
  );
};

ScoreView.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default ScoreView;
