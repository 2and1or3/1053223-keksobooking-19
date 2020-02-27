'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var pinList = document.querySelector('.map__pins');
  var bookings = [];

  var mapForm = window.data.mapElement.querySelector('.map__filters');

  var onSuccessMakePins = function (pinsData) {
    pinList.appendChild(window.getPins(pinsData));

    bookings = pinsData.slice();
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
    deleteCard();

    fragment.appendChild(window.renderCard(bookings[index]));
    window.data.mapElement.appendChild(fragment);

    var cardClose = window.data.mapElement.querySelector('.map__card .popup__close');

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
    if (bookings) {
      var pins = window.data.mapElement.querySelectorAll('.map__pin');

      for (var i = bookings.length; i > 0; i--) {
        pins[i].remove();
      }
    }
  };

  var getRank = function () {
    var housingType = mapFilters.querySelector('#housing-type').value;
    console.log(housingType);
  };

  var mapUpdate = function () {
    deleteCard();
    deletePins();
    getRank();
  };

  var mapFilters = document.querySelector('.map__filters');

  mapFilters.addEventListener('change', function (evt) {
    // console.log(evt.target.value);
    mapUpdate();
  });

  var mapEnable = function () {
    window.data.mapElement.classList.remove('map--faded');
    window.util.enabledChildren(mapForm);

    window.backend.load(onSuccessMakePins, window.util.onAlertError);

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
