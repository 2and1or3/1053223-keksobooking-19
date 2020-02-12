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

  var typeMap = {
    bungalo: {
      label: 'Бунгало',
      minPrice: 0
    },
    flat: {
      label: 'Квартира',
      minPrice: 1000
    },
    house: {
      label: 'Дом',
      minPrice: 5000
    },
    palace: {
      label: 'Дворец',
      minPrice: 10000
    }
  };

  window.util = {
    enterKey: ENTER_KEY,
    escKey: ESC_KEY,
    getRandom: getRandom,
    getRandomArray: getRandomArray,
    typeMap: typeMap
  };
})();
