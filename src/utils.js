/**
 * 节流
 * @param {*} delay 延迟时间
 * @param {*} callback 回调
 */
function throttle(delay, callback) {
  const name =
    new Date().getTime().toString(36) +
    Math.floor(Math.random() * 100000000).toString(36);
  window[name] = undefined;
  return function () {
    if (window[name] === undefined) {
      window[name] = setTimeout(function () {
        callback();
        window[name] = undefined;
      }, delay);
    }
  };
}

module.exports = {
  throttle,
};
