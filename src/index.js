/**
 * 获取dom的位置，返回{ x, y }
 * @param {*} obj
 */
function getElemPos(obj) {
  const target = $(obj);
  const pos = { top: 0, left: 0 };
  if (target.css("position") === "fixed") {
    pos.top =
      (target.css("top") && target.css("top").replace("px", "")) -
      0 +
      window.pageYOffset;
    pos.left =
      (target.css("left") && target.css("left").replace("px", "")) -
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
  if (css.left && $(target).css("position") !== "fixed") {
    css.left += window.pageXOffset;
  } else if (
    css.position &&
    css.position !== "fixed" &&
    $(target).css("position") === "fixed"
  ) {
    css.left =
      $(target)
        .css("left")
        .replace("px", "") -
      0 +
      window.pageXOffset;
  }
  $(target).css(css);
}

/**
 * 注册滚动事件，返回取消注册的函数
 * @param {*} callback
 */
function scrollRegister(callback) {
  callback();
  $(window).on("scroll", callback);
  return function() {
    $(window).off("scroll", callback);
  };
}

/**
 * 注册变化窗口大小时间，返回取消注册的函数
 * @param {*} callback
 */
function resizeRegister(callback) {
  callback();
  $(window).on("resize", callback);
  return function() {
    $(window).off("resize", callback);
  };
}

//

/**
 * 吸在参考左侧
 * @param {*} init init内的参数如下：
 * @param ref 参考
 * @param target 目标
 * @param padding 距离
 * @param stickOver 窗口宽度不足时是否覆盖到参考上
 */
function alwaysStickLeft(init) {
  return function() {
    const _ref = init.ref;
    const _target = init.target;
    const padding = init.padding;
    const stickOver = init.stickOver;

    const ref = $(_ref)[0];
    const target = $(_target)[0];
    const targetWidth = refWidth(target);
    const refToScreenDistance = refLeftToScreenLeft(ref);

    if (refToScreenDistance > targetWidth + padding * 2) {
      cssSetter(target, {
        left: refToScreenDistance - targetWidth - padding
      });
    } else if (stickOver) {
      cssSetter(target, {
        left: padding
      });
    } else {
      cssSetter(target, {
        left: refToScreenDistance - targetWidth - padding
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
  return function() {
    const _ref = init.ref;
    const _target = init.target;
    const padding = init.padding;
    const stickOver = init.stickOver;

    const ref = $(_ref)[0];
    const target = $(_target)[0];
    const targetWidth = refWidth(target);

    if (refRightToScreenRight(ref) > targetWidth + padding * 2) {
      cssSetter(target, {
        left: refRightToScreenLeft(ref) + padding
      });
    } else if (stickOver) {
      cssSetter(target, {
        left: windowWidth() - targetWidth - padding
      });
    } else {
      cssSetter(target, {
        left: refRightToScreenLeft(ref) + padding
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
  return function() {
    const _ref1 = init.ref1;
    const _target = init.target;
    const _ref2 = init.ref2;
    const padding = init.padding;
    const top = init.top;

    const target = $(_target)[0];
    const ref1 = $(_ref1)[0];
    const ref2 = $(_ref2)[0];
    const refToScreenDistance = refTopToScreenTop(target);
    
    if (
      !(refToScreenDistance < top) &&
      ref1BottomToRef2Top(ref1, target) <= padding
    ) {
      cssSetter(target, {
        position: "absolute",
        top: refHeight(ref1) + padding
      });
    } else if (
      !(refToScreenDistance > top) &&
      ref1BottomToRef2Top(target, ref2) <= padding
    ) {
      cssSetter(target, {
        position: "absolute",
        top: getElemPos(ref2).y - padding - refHeight(target)
      });
    } else {
      cssSetter(target, {
        position: "fixed",
        top: top
      });
    }
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
  alwaysStickLeft,
  yBetweenTwoRef,
  alwaysStickRight,
  resizeRegister
};
