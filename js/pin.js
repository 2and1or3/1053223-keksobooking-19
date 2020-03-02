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

  var getPins = function (pinsData) {
    var maxIndex = pinsData.length > PINS_LIMIT ? PINS_LIMIT : pinsData.length;
    for (var i = 0; i < maxIndex; i++) {

      if (!pinsData[i].offer) {
        maxIndex++;
        continue;
      }
      fragment.appendChild(renderPin(pinsData[i]));
    }

    return fragment;
  };

  window.getPins = getPins;
})();
