'use strict';
(function () {
  var DEFAULT_FILTER = 'any';
  var DEBOUNCE_INTERVAL = 500;

  var PRICE_LIMITS = {
    'low': 10000,
    'middle': 50000,
    'high': Infinity
  };

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
      for (var i = pins.length - 1; i > 0; i--) {
        pins[i].remove();
      }
    }
  };

  var getPriceRange = function (price) {
    for (var key in PRICE_LIMITS) {
      if (price < PRICE_LIMITS[key]) {
        return key;
      }
    }
    return null;
  };

  var getFilteredArray = function () {
    var filteredArray = bookings;
    var housingType = mapFilters.querySelector('#housing-type').value;
    var housingPrice = mapFilters.querySelector('#housing-price').value;
    var housingRooms = mapFilters.querySelector('#housing-rooms').value;
    var housingGuests = mapFilters.querySelector('#housing-guests').value;

    var housingFeatureInputValues = Array.from(mapFilters.querySelector('#housing-features').querySelectorAll('input:checked'));
    housingFeatureInputValues.forEach(function (it, ind) {
      housingFeatureInputValues[ind] = it.value;
    });

    if (housingType !== DEFAULT_FILTER) {
      filteredArray = filteredArray.filter(function (it) {
        return it.offer.type === housingType;
      });
    }

    if (housingPrice !== DEFAULT_FILTER) {
      filteredArray = filteredArray.filter(function (it) {
        return getPriceRange(it.offer.price) === housingPrice;
      });
    }

    if (housingRooms !== DEFAULT_FILTER) {
      filteredArray = filteredArray.filter(function (it) {
        return it.offer.rooms === +housingRooms;
      });
    }

    if (housingGuests !== DEFAULT_FILTER) {
      filteredArray = filteredArray.filter(function (it) {
        return it.offer.guests === +housingGuests;
      });
    }

    filteredArray = filteredArray.filter(function (it) {
      return window.util.isSubSet(housingFeatureInputValues, it.offer.features);
    });

    return filteredArray;
  };

  var mapUpdate = function () {
    deleteCard();
    deletePins();

    pinList.appendChild(window.getPins(getFilteredArray()));
  };

  var mapFilters = document.querySelector('.map__filters');
  var lastTimeout;

  mapFilters.addEventListener('change', function () {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      mapUpdate();
    }, DEBOUNCE_INTERVAL);
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
