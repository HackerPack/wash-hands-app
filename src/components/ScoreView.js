import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, H1 } from 'native-base';
import { Text, Button, Layout } from '@ui-kitten/components';
import HistoryList from './History/HistoryList';
import Spacer from './UI/Spacer';
import TodayScoreCard from './UI/TodayScoreCard';
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
  },
  button: {
    flex: 1,
  },
});

const extractTodaysTimeStamps = handWashEvents => {
  const today = new Date().toLocaleDateString();
  return handWashEvents
    .filter(
      handWashEventDate => today === new Date(handWashEventDate.timestamp).toLocaleDateString(),
    );
};
const aggregateTimestamps = handWashHistory => {
  return handWashHistory.reduce(function(map, item) {
    const key = new Date(item.timestamp).toLocaleDateString();
    if (map[key] == null) {
      map[key] = [item];
    } else {
      map[key].push(item);
    }
    return map;
}, {});
};
const ScoreView = ({ navigate }) => {
  const [history, setHistory] = useState({ today: null, allHistory: null });

  useEffect(() => {
    async function fetchHistoryData() {
      const handWashHistory = await Storage.fetchHandWashHistory();
      const todaysTimeStamps = extractTodaysTimeStamps(handWashHistory);
      console.log(aggregateTimestamps(handWashHistory));
      setHistory(prevHistory => ({
        ...prevHistory,
        today: todaysTimeStamps,
        allHistory: handWashHistory,
      }));
    }
    fetchHistoryData();
  }, []);

  if (history.today == null || history.allHistory == null) {
    return null;
  }

  return (
    <Container style={styles.container}>
      <Content padder style={styles.content}>
        <Spacer />
        <TodayScoreCard handWashHistory={history.today}/>
        <Spacer size={10} />
        <Layout style={styles.buttonGroup}>
          <Button style={[styles.button, {marginRight: 12}]}>Share</Button>
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
