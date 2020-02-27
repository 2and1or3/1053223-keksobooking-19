'use strict';

(function () {
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  var mapElement = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

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

  window.data = {
    minCoordinateY: MIN_COORDINATE_Y,
    maxCoordinateY: MAX_COORDINATE_Y,
    typeMap: typeMap,
    mapElement: mapElement,
    mainPin: mainPin,
    mainPinStartCoords: window.util.setStartPosition(mainPin)
  };
})();
