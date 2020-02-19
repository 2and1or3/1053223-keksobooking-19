'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var pinList = document.querySelector('.map__pins');

  var mapForm = window.data.mapElement.querySelector('.map__filters');

  var onSuccessMakePins = function (pinsData) {
    window.data.bookings = pinsData;
    for (var i = 0; i < pinsData.length; i++) {
      pinsData[i].id = i;
      fragment.appendChild(window.renderPin(pinsData[i]));
    }

    pinList.appendChild(fragment);
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

    if (currentCard) {
      currentCard.remove();
    }

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

  var deletePins = function () {
    var bookings = window.data.bookings;
    var pins = window.data.mapElement.querySelectorAll('.map__pin');

    for (var i = bookings.length; i > 0; i--) {
      pins[i].remove();
    }
  };

  var mapEnable = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.util.enabledChildren(mapForm);

    window.backend.load(onSuccessMakePins, window.util.onErrorAlert);

    window.map.isDisable = false;
  };

  var mapDisable = function () {
    if (!window.data.mapElement.classList.contains('map--faded')) {
      window.data.mapElement.classList.add('map--faded');
      deleteCard();
      deletePins();
      window.util.refreshPosition(window.data.mainPinStartCoords, window.data.mainPin);
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
