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
    for (var i = 0; i < PINS_LIMIT; i++) {
      pinsData[i].id = i;
      fragment.appendChild(renderPin(pinsData[i]));
    }

    return fragment;
  };

  window.getPins = getPins;
})();
