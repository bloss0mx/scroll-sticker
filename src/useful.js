const {
  getElemPos,
  windowWidth,
  windowHeight,
  refWidth,
  refHeight,
  ref1BottomToRef2Top,
  refRightToScreenLeft,
  refLeftToScreenLeft,
  refTopToScreenTop,
  refRightToScreenRight,
  cssSetter,
  cacheOriginPos,
} = require('./index');

function fetchElm(selector) {
  const target = $(selector);
  return target && target[0] ? target[0] : null;
}

/**
 * 吸在参考左侧
 * @param {*} init init内的参数如下：
 * @param ref 参考
 * @param target 目标
 * @param padding 距离
 * @param stickOver 窗口宽度不足时是否覆盖到参考上
 */
function alwaysStickLeft(init) {
  const { padding } = init;
  const { stickOver } = init;
  const ref = fetchElm(init.ref);
  const target = fetchElm(init.target);
  if (!ref || !target) return;

  return function () {
    const targetWidth = refWidth(target);
    const refToScreenDistance = refLeftToScreenLeft(ref);

    if (refToScreenDistance > targetWidth + padding * 2) {
      cssSetter(target, {
        left: refToScreenDistance - targetWidth - padding,
      });
    } else if (stickOver) {
      cssSetter(target, {
        left: padding,
      });
    } else {
      cssSetter(target, {
        left: refToScreenDistance - targetWidth - padding,
      });
    }
  };
}

/**
 * 吸在参考右侧
 * @param {*} init init内的参数如下：
 * @param ref 参考
 * @param target 目标
 * @param padding 距离
 * @param stickOver 窗口宽度不足时是否覆盖到参考上
 */
function alwaysStickRight(init) {
  const { padding } = init;
  const { stickOver } = init;
  const ref = fetchElm(init.ref);
  const target = fetchElm(init.target);
  if (!ref || !target) return;

  return function () {
    const targetWidth = refWidth(target);
    if (refRightToScreenRight(ref) > targetWidth + padding * 2) {
      cssSetter(target, {
        left: refRightToScreenLeft(ref) + padding,
      });
    } else if (stickOver) {
      cssSetter(target, {
        left: windowWidth() - targetWidth - padding,
      });
    } else {
      cssSetter(target, {
        left: refRightToScreenLeft(ref) + padding,
      });
    }
  };
}

/**
 * @param {*} init init内的参数如下：
 * @param target 目标
 * @param top 悬空时高度
 * @param bottom 悬空时高度
 * @param topPadding 距离顶部间隙
 * @param bottomPadding 距离底部间隙
 */
function toTopAndBottomDistance(init) {
  const {
    top, bottom, target, topPadding, bottomPadding,
  } = init;
  const $target = fetchElm(target);
  if (!$target) return;

  return function () {
    const bodyHeight = refHeight($('body')[0]);
    const targetHeight = refHeight($target);

    if (
      bodyHeight - window.pageYOffset - bottomPadding - bottom - targetHeight <=
      0
    ) {
      cssSetter($target, {
        top: bodyHeight - bottom - targetHeight,
        position: 'absolute',
      });
    } else if (window.pageYOffset >= top - topPadding) {
      cssSetter($target, {
        top: topPadding,
        position: 'fixed',
      });
    } else if (window.pageYOffset < top - topPadding) {
      cssSetter($target, {
        top,
        position: 'absolute',
      });
    }
  };
}

/**
 * y轴方向，在ref1和ref2之间悬空
 * @param {*} init init内的参数如下：
 * @param ref1 上参考
 * @param target 目标
 * @param ref2 下参考
 * @param padding 距离
 * @param top 悬空时高度
 */
function yBetweenTwoRef(init) {
  const ref1 = fetchElm(init.ref1);
  const ref2 = fetchElm(init.ref2);
  const target = fetchElm(init.target);
  if (!ref1 || !ref2 || !target) return;

  return function () {
    const ref1Bottom = getElemPos(ref1).y + refHeight(ref1);
    const ref2Top = ref2 ?
      refHeight($('body')[0]) - getElemPos(ref2).y :
      init.padding;
    return toTopAndBottomDistance({
      target: init.target,
      top: ref1Bottom + init.padding,
      topPadding: init.padding,
      bottom: ref2Top,
      bottomPadding: init.padding,
    })();
  };
}

module.exports = {
  alwaysStickLeft,
  alwaysStickRight,
  yBetweenTwoRef,
  toTopAndBottomDistance,
};
