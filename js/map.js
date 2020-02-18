'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var pinList = document.querySelector('.map__pins');

  var mapForm = window.data.mapElement.querySelector('.map__filters');

  var onSuccessMakePins = function (pinsData) {

    for (var i = 0; i < pinsData.length; i++) {
      pinsData[i].id = i;
      fragment.appendChild(window.renderPin(pinsData[i]));
    }

    pinList.appendChild(fragment);
  };

  var onErrorAlert = function (errorMessage) {
    var errorElement = document.createElement('div');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: lightblue; color: white;';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';

    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var onCloseClick = function () {
    deleteCard();
  };

  var onPressEsc = function (evt) {
    if (window.util.isEsc(evt)) {
      deleteCard();
    }
  };

  var makeCard = function (index) {

    if (window.data.mapElement.querySelector('.map__card')) {
      deleteCard();
    }

    fragment.appendChild(window.renderCard(window.data.bookings[index]));
    window.data.mapElement.appendChild(fragment);

    var currentCard = window.data.mapElement.querySelector('.map__card');
    var cardClose = currentCard.querySelector('.popup__close');

    cardClose.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onPressEsc);
  };

  var deleteCard = function () {
    var currentCard = window.data.mapElement.querySelector('.map__card');
    currentCard.remove();
    document.removeEventListener('keydown', onPressEsc);
  };

  var showCard = function (evt) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      var currentPinIndex = evt.target.closest('.map__pin').dataset.id;
      makeCard(currentPinIndex);
    }
  };

  pinList.addEventListener('click', function (evt) {
    showCard(evt);
  });

  pinList.addEventListener('keydown', function (evt) {
    if (window.util.isEnter(evt)) {
      showCard(evt);
    }
  });

  var isDisable = true;

  var mapEnable = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.util.enabledChildren(mapForm);

    window.backend.load(onSuccessMakePins, onErrorAlert);

    makeCard(0);
    window.map.isDisable = false;
  };

  var mapDisable = function () {
    if (!window.data.mapElement.classList.contains('map--faded')) {
      window.data.mapElement.classList.add('map--faded');
    }

    window.map.isDisable = true;
    window.util.disabledChildren(mapForm);
  };

  window.map = {
    enable: mapEnable,
    disable: mapDisable,
    isDisable: isDisable
  };
})();
