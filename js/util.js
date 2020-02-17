'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

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

  window.util = {
    isEsc: isEsc,
    isEnter: isEnter,
    getRandom: getRandom,
    getRandomArray: getRandomArray,
    disabledChildren: disabledChildren,
    enabledChildren: enabledChildren
  };
})();
