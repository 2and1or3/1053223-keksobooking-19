'use strict';
(function () {
  var DEFAULT_FILTER = 'any';

  var PRICE_LIMITS = {
    '+50000': 'high',
    '+10000': 'middle',
    '+0': 'low',
  };

  var fragment = document.createDocumentFragment();
  var pinList = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var bookings = [];

  var mapFilters = mapElement.querySelector('.map__filters');

  var onSuccessLoad = function (pinsData) {
    pinsData.forEach(function (pin, index) {
      pin.id = index;
    });

    pinList.appendChild(window.getPins(pinsData));

    bookings = pinsData.slice();
    window.util.enabledChildren(mapFilters);
  };

  var onCloseClick = function () {
    deleteCard();
    resetActivePin();
  };

  var onPressEsc = function (evt) {
    if (window.util.isEsc(evt)) {
      deleteCard();
      resetActivePin();
    }
  };

  var makeCard = function (index) {
    deleteCard();

    fragment.appendChild(window.renderCard(bookings[index]));
    mapElement.appendChild(fragment);

    var cardClose = mapElement.querySelector('.map__card .popup__close');

    cardClose.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onPressEsc);
  };

  var deleteCard = function () {
    var currentCard = mapElement.querySelector('.map__card');

    if (currentCard) {
      currentCard.remove();
    }

    document.removeEventListener('keydown', onPressEsc);
  };

  var lastPin = null;
  var resetActivePin = function () {
    if (lastPin) {
      lastPin.classList.remove('map__pin--active');
    }
  };

  var showCard = function (evt) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      resetActivePin();
      lastPin = evt.target.closest('.map__pin');
      var currentPinIndex = lastPin.dataset.id;
      lastPin.classList.add('map__pin--active');
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
    var pins = mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = pins.length - 1; i >= 0; i--) {
      pins[i].remove();
    }
  };

  var getPriceRange = function (price) {
    for (var key in PRICE_LIMITS) {
      if (+key < price) {
        return PRICE_LIMITS[key];
      }
    }
    return null;
  };

  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var getFilteredArray = function () {

    var typeValue = housingType.value;
    var priceValue = housingPrice.value;
    var roomsValue = housingRooms.value;
    var guestsValue = housingGuests.value;

    var checkedInputs = Array
    .from(housingFeatures.querySelectorAll('input:checked'))
    .map(function (it) {
      return it.value;
    });

    var result = bookings.filter(function (booking) {
      var isTypeMatched = typeValue === DEFAULT_FILTER ? true : booking.offer.type === typeValue;
      var isPriceMatched = priceValue === DEFAULT_FILTER ? true : getPriceRange(booking.offer.price) === priceValue;
      var isRoomsMatched = roomsValue === DEFAULT_FILTER ? true : booking.offer.rooms === +roomsValue;
      var isGuestsMatched = guestsValue === DEFAULT_FILTER ? true : booking.offer.guests === +guestsValue;
      var isFeaturesMatched = window.util.isSubSet(checkedInputs, booking.offer.features);

      return isTypeMatched && isPriceMatched && isRoomsMatched && isGuestsMatched && isFeaturesMatched;
    });

    return result;
  };

  var mapUpdate = function () {
    deleteCard();
    deletePins();

    pinList.appendChild(window.getPins(getFilteredArray()));
  };

  var onFiltersChange = window.util.debounce(mapUpdate);

  mapFilters.addEventListener('change', function () {
    onFiltersChange();
  });

  var mapEnable = function () {
    mapElement.classList.remove('map--faded');

    window.backend.load(onSuccessLoad, window.util.showErrorMessage);

    window.map.isDisable = false;
  };

  var mapDisable = function () {
    if (!mapElement.classList.contains('map--faded')) {
      mapElement.classList.add('map--faded');
      deleteCard();
      deletePins();
      mapFilters.reset();
      window.util.refreshPosition(window.map.mainPinStartCoords, mainPin);
    }

    window.map.isDisable = true;
    window.util.disabledChildren(mapFilters);
  };

  window.map = {
    enable: mapEnable,
    disable: mapDisable,
    isDisable: isDisable,
    mainPin: mainPin,
    mainPinStartCoords: window.util.setStartPosition(mainPin)
  };
})();
