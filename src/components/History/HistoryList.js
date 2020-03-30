import React, { useState, useEffect } from 'react';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import { fetchHandWashHistory } from '../../persistence/storage';
import { StyleSheet } from 'react-native';

const HistoryList = ({ handWashHistory }) => {
  if (handWashHistory.length === 0) {
    return (
      <Text category='p2'>
        No recorded hand washes yet! Start washing your hands
      </Text>
    );
  }
  const renderItem = ({ item }) => {
    const { dateBucket, value } = item;
    const formattedDate = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      weekday: 'long'
    });

    const title = `${value.length}` + ' times';
    const description = formattedDate.format(new Date(dateBucket));
    return <ListItem description={description} title={title}/>;
  };

  return (
    <List
      title="History"
      data={handWashHistory}
      renderItem={renderItem}
      style={styles.listView}
    />
  );
};

const styles = StyleSheet.create({
  listView: {
    marginLeft: -12,
  },
});

export default HistoryList;
