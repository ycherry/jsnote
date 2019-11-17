Element.prototype.dragNclick = (function(menu, elemClick) {
  var bTime = 0, // 点击开始时间
      eTIme = 0,
      cbTime = 0, // 双击开始时间
      ceTime = 0,
      cCount = 0, // 点击计数
      oPos = [], //记录元素在被移动之前的初始位置
      windowWidth = getViewportSize().width, // 获取可视窗口的宽高
      windowHeight = getViewportSize().height,
      eleWidth = getStyles(this, 'width'), // 获取元素的宽高
      eleHeight = getStyles(this, 'height'),
      mWidth = getStyles(menu, 'width'),
      mHeight = getStyles(menu, 'height');
  drag.call(this);
  
  function drag() {
    var x,
        y,
        _self = this;
    addEvent(_self, 'mousedown', function(e) {
      var e = e || window.event,
          btnCode = e.button; // 0 1 2 分别是左中右键
      if(btnCode === 2) { // 点击右键
        var mLeft =  pagePos(e).X,
            mTop = pagePos(e).Y;
        if(mLeft <= 0) {
          mLeft = 0;
        } else if(mLeft >= windowWidth - mWidth) { // 右边超出边界，则将菜单显示在鼠标左边
          mLeft = pagePos(e).X - mWidth;
        }

        if(mTop <= 0) {
          mTop = 0;
        } else if(mTop >= windowHeight - mHeight) {
          mTop = pagePos(e).Y - mHeight;
        }

        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';
      } else if(btnCode === 0) { // 点击左键
        bTime = new Date().getTime(),
        oPos = [getStyles(_self, 'left'), getStyles(_self, 'top')];
        menu.style.display = 'none'; // 点击左键的时候，右键菜单应该隐藏
        // 获取鼠标相对于被拖动元素左上角的距离x，y
        x = pagePos(e).X - getStyles(_self, 'left'),
        y = pagePos(e).Y - getStyles(_self, 'top');
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        cancelBuble(e);
        preventDefaultEvent(e);
      }
    });
    // 阻止默认的鼠标右键事件
    addEvent(document, 'contextmenu', function(e) {
      var e = e || window.event;
      preventDefaultEvent(e);
    });
    // 点击其它地方右键菜单应该消失
    addEvent(document, 'click', function(e) {
      menu.style.display = 'none';
    });
    // 点击自己右键菜单不应该消失
    addEvent(menu, 'click', function(e) {
      var e = e || window.event;
      cancelBuble(e);
    });
  
    function mouseMove(e) {
      var e = e || window.event,
          elemLeft = pagePos(e).X - x,
          elemTop = pagePos(e).Y - y;
      // 处理边界问题开始
      if(elemLeft<= 0 ) {
        elemLeft = 0;
      } else if(elemLeft + eleWidth >= windowWidth) {
        elemLeft = windowWidth - eleWidth;
      }
  
      if(elemTop <= 0 ) {
        elemTop = 0;
      } else if(elemTop  + eleHeight >= windowHeight) {
        elemTop = windowHeight - eleHeight;
      }
      // 处理边界问题结束
      _self.style.left = elemLeft + 'px';
      _self.style.top = elemTop + 'px';
    }
  
    function mouseUp(e) {
      var e = e || window.event;
      eTime = new Date().getTime();
      if(eTime - bTime < 100) { // 如果mousedown和mouseup之间的时间小于100ms，则认为是click
        // 防止鼠标不小心移动元素，给元素复位
        _self.style.left = oPos[0] + 'px';
        _self.style.top = oPos[1] + 'px';

        cCount++;
        if(cCount === 1) {
          cbTime = new Date().getTime();
        }

        if(cCount === 2) {
          ceTime = new Date().getTime();
        }

        if(cbTime && ceTime && (ceTime - cbTime <= 500)) { // 模拟双击就是计算鼠标两次放开的时间差，如果小于500ms，则认为是双击。双击事件处理完之后，所有东西要复位
          console.log('double click called');
        }

        t = setTimeout(function(){
          cbTime = 0;
          ceTime = 0;
          cCount = 0;
          clearTimeout(t);
        }, 200);
        console.log(1);
      }
      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }
  }
});