

const utils = {
  getTimeinSeconds: (fill, total) => {
    const totalInSeconds = total / 1000;
    return totalInSeconds - Math.floor(fill * totalInSeconds / 100);
  }
}

export default utils;
