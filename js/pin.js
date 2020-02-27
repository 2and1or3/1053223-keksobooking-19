'use strict';
(function () {
  var PINS_LIMIT = 5;
  var pinTemplate = document.querySelector('#pin').content
    .querySelector('button');
  var fragment = document.createDocumentFragment();

  var renderPin = function (pinData) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pinData.location.x + 'px';
    pinElement.style.top = pinData.location.y + 'px';

    pinElement.dataset.id = pinData.id;

    var pinImgElement = pinElement.querySelector('img');
    pinImgElement.src = pinData.author.avatar;
    pinImgElement.alt = pinData.offer.title;

    return pinElement;
  };

  var isIdSeted = false;

  var getPins = function (pinsData) {
    for (var i = 0; i < pinsData.length; i++) {

      if (!isIdSeted) {
        pinsData[i].id = i;
      }

      if (i < PINS_LIMIT) {
        fragment.appendChild(renderPin(pinsData[i]));
      }
    }

    isIdSeted = true;
    return fragment;
  };

  window.getPins = getPins;
})();
