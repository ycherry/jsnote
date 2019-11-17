function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el);
    });
  } else {
    el['on' + type] = fn;
  }
}


function removeEvent(el, type, fn) {
  if(el.addEventListener) {
    el.removeEventListener(type, fn, false);
  } else if(el.attachEvent) {
    el.detachEvent('on'+type, fn);
  } else {
    el['on' + type] = null;
  }
}

function getStyles(elem, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return parseInt(window.getComputedStyle(elem, null)[prop]);
    } else {
      return window.getComputedStyle(elem, null);
    }
  } else if (elem.currentStyle) {
    if (prop) {
      return parseInt(elem.currentStyle[prop]);
    } else {
      return elem.currentStyle;
    }

  }
}

function getEleDocPosition(ele) {
  var parent = ele.offsetParent,
    offsetLeft = ele.offsetLeft,
    offsetTop = ele.offsetTop;
  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

function getScrollWidth() {
  if (document.body.scrollHeight) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    };
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

// 获取浏览器可视窗口的宽高
function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else if (document.compatMode === 'CSS1Compat') {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

// 获取滚动条的距离
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft, //document.body.scrollLeft 和 document.documentElement.scrollLeft都是数字类型，不存在即为0
      top: document.body.scrollTop + document.documentElement.scrollTop,
    }
  }
}

function elemChildren(node) {
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  },
    children = node.childNodes;
  for (var i = 0; i < children.length; i++) {
    var childItem = children[i];

    if (childItem.nodeType === 1) {
      // temp[temp['length']] = childItem;
      // temp['length']++;
      temp.push(childItem);
    }
  }
  return temp;
}

function cancelBuble(e) {
  var e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBuble = true;
  }
}


function preventDefaultEvent(e) {
  var e = window.event;
  if(e.preventDefault) { // W3C规范
    e.preventDefault();
  } else { // IE兼容
    e.returnValue = false;
  }
}

// 获取元素相对于整个页面的位置(包括滚动条)
function pagePos(e) {
  var scrollLeft= getScrollOffset().left,
      scrollTop = getScrollOffset().top,
      clientLeft = document.documentElement.clientLeft || 0, // 浏览器页面固有的margin
      clientTop = document.documentElement.clientTop || 0;
  return {
    X: e.clientX + scrollLeft - clientLeft,
    Y: e.clientY + scrollTop - clientTop
  };
}


// function elemDrag(elem) {
//   var x,
//       y;
//   addEvent(elem, 'mousedown', function(e) {
//     var e = e || window.event;
//     // 获取鼠标相对于被拖动元素左上角的距离x，y
//     x = pagePos(e).X - getStyles(elem, 'left'),
//     y = pagePos(e).Y - getStyles(elem, 'top');
//     addEvent(document, 'mousemove', mouseMove);
//     addEvent(document, 'mouseup', mouseUp);
//     cancelBuble(e);
//     preventDefaultEvent(e);
//   });

//   function mouseMove(e) {
//     var e = e || window.event,
//         elemLeft = pagePos(e).X - x,
//         elemTop = pagePos(e).Y - y;
//     if(elemLeft<= 0 ) {
//       elemLeft = 0;
//     } else if(elemLeft + getStyles(elem, 'width') >= document.body.clientWidth) {
//       elemLeft = document.body.clientWidth - getStyles(elem, 'width');
//     }

//     if(elemTop <= 0 ) {
//       elemTop = 0;
//     } else if(elemTop  + getStyles(elem, 'height') >= document.body.clientHeight) {
//       elemTop = document.body.clientHeight - getStyles(elem, 'height');
//     }
//     elem.style.left = elemLeft + 'px';
//     elem.style.top = elemTop + 'px';
//   }

//   function mouseUp(e) {
//     var e = e || window.event;
//     removeEvent(document, 'mousemove', mouseMove);
//     removeEvent(document, 'mouseup', mouseUp);
//   }
// }