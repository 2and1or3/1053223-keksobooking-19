'use strict';

(function () {
  var mapForm = window.data.mapElement.querySelector('.map__filters');

  var activateApp = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');

    window.util.enabledChildren(window.form.adForm);
    window.util.enabledChildren(mapForm);

    window.map.makePins();
    window.map.makeCard(0);

    window.data.mainPin.removeEventListener('keydown', window.drag.onMainPinPress);
  };

  var disableApp = function () {
    if (!window.data.mapElement.classList.contains('map--faded')) {
      window.data.mapElement.classList.add('map--faded');
    }

    if (!window.form.adForm.classList.contains('ad-form--disabled')) {
      window.form.adForm.classList.add('ad-form--disabled');
    }

    window.util.disabledChildren(window.form.adForm);
    window.util.disabledChildren(mapForm);

    window.form.setAddress();
  };

  disableApp();

  window.data.mainPin.addEventListener('mousedown', window.drag.onMainPinClick);

  window.data.mainPin.addEventListener('keydown', window.drag.onMainPinPress);

  window.main = {
    activateApp: activateApp
  };
})();
