import AsyncStorage from '@react-native-community/async-storage';

export const HASH_WASH_HISTORY_KEY = 'handWashHistory';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error storing data: ${e}`, e.stack);
  }
};

export const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(`Error getting data: ${e}`, e.stack);
  }
};

// TODO: replace with something at actually scales here
export const recordHandWash = async () => {
  let handWashHistory = JSON.parse(await getData(HASH_WASH_HISTORY_KEY));

  handWashHistory = handWashHistory || [];

  handWashHistory.push({
    timestamp: new Date().toISOString(),
  });

  await storeData(HASH_WASH_HISTORY_KEY, JSON.stringify(handWashHistory));
};

export const fetchHandWashHistory = async () => JSON.parse(await getData(HASH_WASH_HISTORY_KEY)) || [];
