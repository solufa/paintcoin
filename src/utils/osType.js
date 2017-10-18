const osType = {
  isIOS() { return /iphone|ipod|ipad/.test(navigator.userAgent.toLowerCase()); },
  isAndroid() { return /android/.test(navigator.userAgent.toLowerCase()); },
  isPC() { return !osType.isIOS() && !osType.isAndroid() && !/mobile/.test(navigator.userAgent.toLowerCase()); },
};

export default osType;
