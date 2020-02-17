'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var pinList = document.querySelector('.map__pins');

  var makePins = function () {

    for (var i = 0; i < window.data.bookings.length; i++) {
      fragment.appendChild(window.renderPin(window.data.bookings[i]));
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

  window.map = {
    makePins: makePins,
    makeCard: makeCard
  };
})();
