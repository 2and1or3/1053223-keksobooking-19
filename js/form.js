'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');

  var typeMap = {
    bungalo: {
      label: 'Бунгало',
      minPrice: 0
    },
    flat: {
      label: 'Квартира',
      minPrice: 1000
    },
    house: {
      label: 'Дом',
      minPrice: 5000
    },
    palace: {
      label: 'Дворец',
      minPrice: 10000
    }
  };

  var setAddress = function () {
    var addressInput = adForm.querySelector('#address');
    var pinTop = parseInt(window.map.mainPin.style.top.replace('px', ''), 10) + window.map.mainPin.offsetHeight;
    var pinLeft = parseInt(window.map.mainPin.style.left.replace('px', ''), 10) + Math.round(window.map.mainPin.offsetWidth / 2);

    addressInput.value = pinTop + ', ' + pinLeft;
  };

  var roomControl = adForm.querySelector('#room_number');
  var guestControl = adForm.querySelector('#capacity');

  var deleteLastGuests = function (lastValue) {
    var guests = guestControl.children;
    var lastRoomIndex = parseInt(lastValue, 10) - 1;

    if (lastValue !== '100') {
      for (var i = 0; i < guests.length; i++) {
        if (i <= lastRoomIndex) {
          guests[i].disabled = false;
        } else {
          guests[i].disabled = true;
        }
      }

      if (lastRoomIndex < guestControl.value) {
        guests[lastRoomIndex].selected = true;
      }
    } else {
      for (var j = 0; j < guests.length; j++) {
        guests[j].disabled = true;
      }

      guests[guests.length - 1].disabled = false;
      guests[guests.length - 1].selected = true;
    }
  };

  roomControl.addEventListener('change', function () {
    var rooms = roomControl.children;

    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].selected) {
        deleteLastGuests(rooms[i].value);
      }
    }
  });

  var priceControl = adForm.querySelector('#price');
  var typeControl = adForm.querySelector('#type');

  var setMinPrice = function (price) {
    if ((priceControl.value < price) && priceControl.value !== '') {
      priceControl.value = price;
    }
    priceControl.setAttribute('min', price);
  };

  typeControl.addEventListener('change', function () {
    var types = typeControl.children;

    for (var i = 0; i < types.length; i++) {
      if (types[i].selected) {
        setMinPrice(typeMap[types[i].value].minPrice);
      }
    }
  });

  var timeInControl = adForm.querySelector('#timein');
  var timeOutControl = adForm.querySelector('#timeout');

  var syncTimes = function (selectFrom, selectTo) {
    selectTo.value = selectFrom.value;
  };

  timeInControl.addEventListener('change', function (evt) {
    var select = evt.target;
    syncTimes(select, timeOutControl);
  });

  timeOutControl.addEventListener('change', function (evt) {
    var select = evt.target;
    syncTimes(select, timeInControl);
  });

  var formEnable = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enabledChildren(adForm);
  };

  var formDisable = function () {
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    adForm.reset();
    window.util.disabledChildren(adForm);
  };

  var successMessageTemplate = document.querySelector('#success').content
    .querySelector('.success');

  var errorMessageTemplate = document.querySelector('#error').content
    .querySelector('.error');

  var onPressEsc = function (evt) {
    if (window.util.isEsc(evt)) {
      document.body.querySelector('.modal-message').remove();
      document.removeEventListener('keydown', onPressEsc);
      document.removeEventListener('click', onClick);
    }
  };

  var onClick = function () {
    document.body.querySelector('.modal-message').remove();
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onPressEsc);
  };

  var displayMessage = function (template) {
    var element = template.cloneNode(true);
    element.classList.add('modal-message');

    document.addEventListener('keydown', onPressEsc);

    document.addEventListener('click', onClick);

    document.body.querySelector('main').appendChild(element);
  };

  var onSendSuccess = function () {
    window.main.disableApp();
    displayMessage(successMessageTemplate);
  };

  var onSendError = function (errorMessage) {
    window.util.showErrorMessage(errorMessage);
    displayMessage(errorMessageTemplate);
  };

  var formReset = function () {
    adForm.reset();
    window.util.refreshPosition(window.map.mainPinStartCoords, window.map.mainPin);
    window.form.setAddress();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSendSuccess, onSendError);
  });

  adForm.addEventListener('reset', formReset);

  window.form = {
    setAddress: setAddress,
    enable: formEnable,
    disable: formDisable,
    messageDisplay: null,
    typeMap: typeMap
  };
})();
