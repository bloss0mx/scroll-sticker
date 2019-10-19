const { throttle } = require('./utils');

/**
 * 获取dom的位置，返回{ x, y }
 * @param {*} obj
 */
function getElemPos(obj) {
  const target = $(obj);
  const pos = { top: 0, left: 0 };
  if (target.css('position') === 'fixed') {
    pos.top =
      (target.css('top') && target.css('top').replace('px', '')) -
      0 +
      window.pageYOffset;
    pos.left =
      (target.css('left') && target.css('left').replace('px', '')) -
      0 +
      window.pageXOffset;
  } else {
    if (obj.offsetParent) {
      while (obj.offsetParent) {
        pos.top += obj.offsetTop;
        pos.left += obj.offsetLeft;
        obj = obj.offsetParent;
      }
    } else if (obj.x) {
      pos.left += obj.x;
    } else if (obj.x) {
      pos.top += obj.y;
    }
  }
  return { x: pos.left, y: pos.top };
}

/**
 * 获取窗口宽度
 */
function windowWidth() {
  return window.innerWidth;
}

/**
 * 获取窗口高度
 */
function windowHeight() {
  return window.innerHeight;
}

/**
 * 获取dom宽度
 * @param {} ref
 */
function refWidth(ref) {
  return ref.clientWidth;
}

/**
 * 获取dom高度
 * @param {} ref
 */
function refHeight(ref) {
  return ref.clientHeight;
}

/**
 * 从ref1底部到ref2顶部的距离
 * @param {*} ref1
 * @param {*} ref2
 */
function ref1BottomToRef2Top(ref1, ref2) {
  return getElemPos(ref2).y - getElemPos(ref1).y - refHeight(ref1);
}

/**
 * 从dom右侧到屏幕左侧的距离
 * @param {*} ref
 */
function refRightToScreenLeft(ref) {
  return refWidth(ref) + getElemPos(ref).x - window.pageXOffset;
}

/**
 * 从dom左侧到屏幕左侧的距离
 * @param {*} ref
 */
function refLeftToScreenLeft(ref) {
  return getElemPos(ref).x - window.pageXOffset;
}

/**
 * 从dom底部到屏幕顶部的距离
 * @param {*} ref
 */
function refBottomToScreenTop(ref) {
  return refHeight(ref) + getElemPos(ref).y - window.pageYOffset;
}

/**
 * 从dom顶部到屏幕顶部的距离
 * @param {*} ref
 */
function refTopToScreenTop(ref) {
  return getElemPos(ref).y - window.pageYOffset;
}

/**
 * 从dom右侧到屏幕右侧的距离
 * @param {*} ref
 */
function refRightToScreenRight(ref) {
  return (
    window.pageXOffset + window.innerWidth - (getElemPos(ref).x + refWidth(ref))
  );
}

/**
 * 从dom左侧到屏幕右侧的距离
 * @param {*} ref
 */
function refLeftToScreenRight(ref) {
  return window.pageXOffset + window.innerWidth - getElemPos(ref).x;
}

/**
 * 从dom底部到屏幕底部的距离
 * @param {*} ref
 */
function refBottomToScreenBottom(ref) {
  return (
    window.pageYOffset +
    window.innerHeight -
    (getElemPos(ref).y + refHeight(ref))
  );
}

/**
 * 从dom顶部到屏幕底部的距离
 * @param {*} ref
 */
function refTopToScreenBottom(ref) {
  return window.pageYOffset + window.innerHeight - getElemPos(ref).y;
}

/**
 * 设置css
 * @param {*} target
 * @param {*} css 对象
 */
function cssSetter(target, css) {
  if (css.position === 'unset') {
    $(target).css({ position: 'unset', left: 'unset', top: 'unset' });
  } else if (
    css.left &&
    css.position !== 'fixed' &&
    $(target).css('position') !== 'fixed'
  ) {
    css.left += window.pageXOffset;
  } else if (
    css.position &&
    css.position === 'fixed' &&
    $(target).css('position') !== 'fixed'
  ) {
    css.left =
      $(target)
        .css('left')
        .replace('px', '') -
      0 -
      window.pageXOffset;
  } else if (
    css.position &&
    css.position !== 'fixed' &&
    $(target).css('position') === 'fixed'
  ) {
    css.left =
      $(target)
        .css('left')
        .replace('px', '') -
      0 +
      window.pageXOffset;
  }
  $(target).css(css);
}

/**
 * 缓存target的初始状态
 * @param {*} target
 */
function cacheOriginPos(target) {
  if (window.DM_STICKER_ORIGIN_POS_CACHE === undefined) {
    const $target = $(target);
    const position = $target.css('position') || 'unset';
    const top = $target.css('top') || 'unset';
    const left = $target.css('left') || 'unset';
    window.DM_STICKER_ORIGIN_POS_CACHE = {
      position,
      top,
      left,
    };
  }
  return window.DM_STICKER_ORIGIN_POS_CACHE;
}

/**
 * 注册滚动事件，返回取消注册的函数
 * @param {*} callback
 * @param Number 节流时间，默认为100ms
 */
function scrollRegister(callback, delay = 100) {
  if (!callback) return function () {};

  callback();
  const throttledCallback = throttle(delay, callback);
  $(window).on('scroll', throttledCallback);
  return function () {
    $(window).off('scroll', callback);
  };
}

/**
 * 注册变化窗口大小时间，返回取消注册的函数
 * @param {*} callback
 * @param Number 节流时间，默认为100ms
 */
function resizeRegister(callback, delay = 100) {
  if (!callback) return function () {};

  callback();
  const throttledCallback = throttle(delay, callback);
  $(window).on('resize', throttledCallback);
  return function () {
    $(window).off('resize', callback);
  };
}

module.exports = {
  getElemPos,
  windowWidth,
  windowHeight,
  refWidth,
  refHeight,
  ref1BottomToRef2Top,
  refRightToScreenLeft,
  refLeftToScreenLeft,
  refBottomToScreenTop,
  refTopToScreenTop,
  refRightToScreenRight,
  refLeftToScreenRight,
  refBottomToScreenBottom,
  refTopToScreenBottom,
  cssSetter,
  scrollRegister,
  resizeRegister,
  cacheOriginPos,
};
