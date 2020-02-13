'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var mapForm = mapElement.querySelector('.map__filters');

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

  var activateApp = function () {
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    enabledChildren(adForm);
    enabledChildren(mapForm);

    window.map.makePins();
    window.map.makeCard(0);

    mainPin.removeEventListener('keydown', window.drag.onMainPinPress);
  };

  var disableApp = function () {
    if (!mapElement.classList.contains('map--faded')) {
      mapElement.classList.add('map--faded');
    }

    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }

    disabledChildren(adForm);
    disabledChildren(mapForm);

    window.form.setAddress();
  };

  disableApp();

  mainPin.addEventListener('mousedown', window.drag.onMainPinClick);

  mainPin.addEventListener('keydown', window.drag.onMainPinPress);

  window.main = {
    activateApp: activateApp
  };

})();
