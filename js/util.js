'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;
  var DEBOUNCE_INTERVAL = 500;

  var getRandom = function (max) {
    return Math.floor(Math.random() * Math.floor(++max));
  };

  var getRandomArray = function (array, max) {
    var arr = [];

    for (var i = 0; i < getRandom(max); i++) {
      arr[i] = array[i];
    }

    return arr;
  };

  var disabledChildren = function (parent) {
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {
      children[i].disabled = true;
    }
  };

  var enabledChildren = function (parent) {
    var children = parent.children;

    for (var i = 0; i < children.length; i++) {
      children[i].disabled = false;
    }
  };

  var isEsc = function (evt) {
    if (evt.keyCode === ESC_KEY) {
      return true;
    }
    return false;
  };

  var isEnter = function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      return true;
    }
    return false;
  };

  var showErrorMessage = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.classList.add('error-line');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: lightblue; color: white;';
    errorElement.style.position = 'fixed';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
    window.main.disableApp();
  };

  var refreshPosition = function (startCoordsObject, element) {
    element.style.left = startCoordsObject.x;
    element.style.top = startCoordsObject.y;
  };

  var setStartPosition = function (element) {
    return {
      x: element.getBoundingClientRect().x - element.offsetParent.getBoundingClientRect().x + 'px',
      y: element.getBoundingClientRect().y - element.offsetParent.getBoundingClientRect().y + 'px'
    };
  };

  var isSubSet = function (sub, set) {
    set = Array.from(set);
    sub = Array.from(sub);

    return sub.every(function (elem) {
      return set.includes(elem);
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    isEsc: isEsc,
    isEnter: isEnter,
    getRandom: getRandom,
    getRandomArray: getRandomArray,
    disabledChildren: disabledChildren,
    enabledChildren: enabledChildren,
    showErrorMessage: showErrorMessage,
    setStartPosition: setStartPosition,
    refreshPosition: refreshPosition,
    isSubSet: isSubSet,
    debounce: debounce
  };
})();
