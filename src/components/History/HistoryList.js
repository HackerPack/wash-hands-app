import React, { useState, useEffect } from 'react';
import { Button, Icon, List, ListItem } from '@ui-kitten/components';
import { fetchHandWashHistory } from '../../persistence/storage';

const HistoryList = ({ handWashHistory, onlyTime }) => {
  const renderItem = ({ item }) => {
    const { timestamp } = item;
    const dateTime = onlyTime
      ? new Date(timestamp).toLocaleTimeString()
      : new Date(timestamp).toLocaleString();
    return <ListItem title={`${dateTime}`} />;
  };

  return <List title="History" data={handWashHistory} renderItem={renderItem} />;
};

export default HistoryList;
