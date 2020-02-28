'use strict';

(function () {
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      if (window.map.isDisable) {
        window.main.activateApp();
      }

      var relativeParent = window.map.mainPin.offsetParent;

      var limits = {
        left: relativeParent.getBoundingClientRect().left,
        right: relativeParent.getBoundingClientRect().right,
        top: MIN_COORDINATE_Y,
        bottom: MAX_COORDINATE_Y
      };

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: null,
          y: null
        };

        if ((moveEvt.pageX > limits.left) && (moveEvt.pageX < limits.right)) {

          shift.x = startCoords.x - moveEvt.clientX;
          startCoords.x = moveEvt.clientX;
          window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
          window.form.setAddress();
        }

        if ((moveEvt.pageY > limits.top) && (moveEvt.pageY < limits.bottom)) {
          shift.y = startCoords.y - moveEvt.clientY;
          startCoords.y = moveEvt.clientY;
          window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
          window.form.setAddress();
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onMainPinPress = function (evt) {
    if (window.util.isEnter(evt)) {
      window.main.activateApp();
    }
  };

  window.drag = {
    onMainPinClick: onMainPinClick,
    onMainPinPress: onMainPinPress
  };
})();
