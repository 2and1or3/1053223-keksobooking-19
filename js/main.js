'use strict';

(function () {
  var activateApp = function () {
    window.form.enable();

    window.map.enable();

    if (document.querySelector('.error-line')) {
      document.querySelector('.error-line').remove();
    }

    window.data.mainPin.removeEventListener('keydown', window.drag.onMainPinPress);
  };

  var disableApp = function () {
    window.form.disable();

    window.map.disable();

    window.form.setAddress();
  };

  disableApp();

  window.data.mainPin.addEventListener('mousedown', window.drag.onMainPinClick);

  window.data.mainPin.addEventListener('keydown', window.drag.onMainPinPress);

  window.main = {
    activateApp: activateApp,
    disableApp: disableApp
  };
})();
