import {getData, HASH_WASH_HISTORY_KEY} from '../persistence/storage';
import timeConstants from '../constants/timeConstants';

const utils = {
  getTimeinSeconds: (fill, total) => {
    const totalInSeconds = total / 1000;
    return totalInSeconds - Math.floor(fill * totalInSeconds / 100);
  },

  formatSecondsToString: (seconds) => {
    function pad(num) {
      return ("0"+num).slice(-2);
    }
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes/60)
    return `${pad(hours)}:${pad(minutes%60)}:${pad(seconds%60)}`;
  },

  fetchTimeLapsedSinceLastWash: async () => {
    let handWashHistory = JSON.parse(await getData(HASH_WASH_HISTORY_KEY));
    handWashHistory = handWashHistory || [];
    if (handWashHistory.length === 0) {
      return 0;
    }
    const latestTimestamp = handWashHistory[handWashHistory.length-1];
    const timeLapsed = (new Date().getTime()) - (new Date(latestTimestamp.timestamp).getTime());
    return Math.round(timeLapsed/1000);
  },

  fetchCurrentHomeTimer: async () => {
    const timeLapsed = await utils.fetchTimeLapsedSinceLastWash();
    return timeConstants.HOME_TIMER - timeLapsed;
  }
}

export default utils;
