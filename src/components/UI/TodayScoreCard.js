import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Text } from '@ui-kitten/components';
import { Image, StyleSheet } from 'react-native';

const content = {
  0: {
    image: require('../../images/4.png'),
    title: 'LETS GET STARTED',
    body: 'You haven\'t washed your hands today yet. Start washing your hands right now!',
  },
  1: {
    image: require('../../images/2.png'),
    title: 'GREAT START!',
    body: 'That\'s a good start for the day. Lets keep washing our hands',
  },
  2: {
    image: require('../../images/5.png'),
    title: 'KEEP GOING',
    body: 'You have made it twice today. Keep going',
  },
  3: {
    image: require('../../images/9.png'),
    title: 'THE FIGHTER',
    body: 'You have washed three times today. Lets keep fighting',
  },
  4: {
    image: require('../../images/3.png'),
    title: 'CLEAN HANDS HERO',
    body: 'Your hands are super clean. Thanks for being a hero!',
  },
  other: {
    image: require('../../images/1.png'),
    title: 'INVINCIBLE',
    body: 'Your hand wash today has protected you and helped mankind fight!',
  }
};

const TodayScoreCard = ({ handWashHistory }) => {
  const todayScore = handWashHistory.length;
  const currentContent = todayScore < 5 ? content[todayScore] : content['other'];

  return (
    <Card style={styles.card}>
      <Layout style={styles.container}>
        <Image style={styles.image} source={currentContent.image} />
        <Layout style={styles.content}>
          <Text
            category='h6'
            style={{width: 188, marginBottom: 8}}
          >
            {currentContent.title}
          </Text>
          <Text category='p1' style={{width: 188}}>{currentContent.body}</Text>
        </Layout>
      </Layout>
    </Card>
  );
};

const cardColor = '#B3FFD6';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: cardColor,
  },
  card: {
    backgroundColor: cardColor,
  },
  content: {
    marginLeft: 12,
    backgroundColor: cardColor,
  },
  image: {
    marginLeft: -8,
    width: 120,
    height: 120,
  },
});

TodayScoreCard.propTypes = {
  handWashHistory: PropTypes.array.isRequired,
};

export default TodayScoreCard;
