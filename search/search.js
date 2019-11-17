window.onload = function () {
  this.init();
}

function init() {
  keySearch();
}

var keySearch = (function () {
  var searchKw = document.getElementById('J_search_kw'),
    autoKw = document.getElementById('J_autoKw'),
    recomKw = JSON.parse(document.getElementById('J_recomKw').innerHTML),
    kwOrder = 0,
    t = null;
  
  addEvent(searchKw, 'focus', function() {
    clearInterval(t);
    autoKw.style.color = '#ccc';
  });

  addEvent(searchKw, 'blur', function() {
    autoKwShow(this.value, true);
    t = setInterval(autoKwChange, 3000);
  });
  // 输入框改变的时候触发的函数
  addEvent(searchKw, 'input', function() {
    autoKwShow(this.value);
  });
  // 输入框改变的时候触发的函数 兼容性写法
  addEvent(searchKw, 'propertychange', function() {
    autoKwShow(this.value);
  });

  function setAutoKws() {
    autoKwChange();
    t = setInterval(autoKwChange, 3000);
  }
  // 设置循环播放的顺序
  function autoKwChange() {
    var len = recomKw.length;

    autoKw.innerHTML = recomKw[kwOrder];

    kwOrder = kwOrder >= len - 1 ? 0 : kwOrder + 1;
  }

  function autoKwShow(val, isBlur) {
    if(val.length <= 0) {
      autoKw.className = 'auto-kw show';
      autoKw.style.color = isBlur? '#989898' : '#ccc';
    } else {
      autoKw.className = 'auto-kw hide';
    }
  }
  return function () {
    setAutoKws();
  }
})();