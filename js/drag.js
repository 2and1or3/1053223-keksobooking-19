'use strict';

(function () {
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
    this.shiftX = 0;
    this.shiftY = 0;
  };

  Coordinate.prototype.setX = function (x) {
    this.x = x;
  };

  Coordinate.prototype.setY = function (y) {
    this.y = y;
  };

  Coordinate.prototype.setShiftX = function (x) {
    this.shiftX = x;
  };

  Coordinate.prototype.setShiftY = function (y) {
    this.shiftY = y;
  };

  var Rect = function (top, right, bottom, left) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
  };

  var relativeParent = window.map.mainPin.offsetParent;

  var limits = new Rect(MIN_COORDINATE_Y, relativeParent.getBoundingClientRect().right, MAX_COORDINATE_Y, relativeParent.getBoundingClientRect().left);

  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      if (window.map.isDisable) {
        window.main.activateApp();
      }

      var startCoords = new Coordinate(evt.clientX, evt.clientY);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if ((moveEvt.pageX > limits.left) && (moveEvt.pageX < limits.right)) {
          startCoords.setShiftX(startCoords.x - moveEvt.clientX);
          startCoords.setX(moveEvt.clientX);
          window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - startCoords.shiftX) + 'px';
          window.form.setAddress();
        }

        if ((moveEvt.pageY > limits.top) && (moveEvt.pageY < limits.bottom)) {
          startCoords.setShiftY(startCoords.y - moveEvt.clientY);
          startCoords.setY(moveEvt.clientY);
          window.map.mainPin.style.top = (window.map.mainPin.offsetTop - startCoords.shiftY) + 'px';
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
