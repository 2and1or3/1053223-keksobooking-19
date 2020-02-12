'use strict';
(function () {
  var mapElement = document.querySelector('.map');
  var fragment = document.createDocumentFragment();
  var pinList = document.querySelector('.map__pins');


  var makePins = function () {

    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(window.pin.renderPin(window.data[i]));
    }

    pinList.appendChild(fragment);
  };

  var onCloseClick = function () {
    deleteCard();
  };

  var onPressEsc = function (evt) {
    if (evt.keyCode === window.util.escKey) {
      deleteCard();
    }
  };

  var makeCard = function (index) {

    if (mapElement.querySelector('.map__card')) {
      deleteCard();
    }

    fragment.appendChild(window.card.renderCard(window.data[index]));
    mapElement.appendChild(fragment);

    var currentCard = mapElement.querySelector('.map__card');
    var cardClose = currentCard.querySelector('.popup__close');

    cardClose.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onPressEsc);
  };

  var deleteCard = function () {
    var currentCard = mapElement.querySelector('.map__card');
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
    if (evt.keyCode === window.util.enterKey) {
      showCard(evt);
    }
  });

  window.map = {
    makePins: makePins,
    makeCard: makeCard
  };

})();
