'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');


  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      window.main.activateApp();

      var relativeParent = mainPin.offsetParent;

      var limits = {
        left: relativeParent.getBoundingClientRect().left,
        right: relativeParent.getBoundingClientRect().right,
        top: window.data.minCoordinateY,
        bottom: window.data.maxCoordinateY
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
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
          window.form.setAddress();
        }

        if ((moveEvt.pageY > limits.top) && (moveEvt.pageY < limits.bottom)) {
          shift.y = startCoords.y - moveEvt.clientY;
          startCoords.y = moveEvt.clientY;
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
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
    if (evt.keyCode === window.util.enterKey) {
      window.main.activateApp();
    }
  };


  window.drag = {
    onMainPinClick: onMainPinClick,
    onMainPinPress: onMainPinPress
  };
})();
