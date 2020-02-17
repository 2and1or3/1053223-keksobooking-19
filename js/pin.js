'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content
    .querySelector('button');

  var renderPin = function (pinData) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinData.offer.location.x;
    pinElement.style.top = pinData.offer.location.y;

    pinElement.dataset.id = pinData.id;

    var pinImgElement = pinElement.querySelector('img');
    pinImgElement.src = pinData.author.avatar;
    pinImgElement.alt = pinData.offer.title;

    return pinElement;
  };

  window.renderPin = renderPin;
})();
