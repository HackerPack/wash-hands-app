

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
  }
}

export default utils;
