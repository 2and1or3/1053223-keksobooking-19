'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');

  var setAddress = function () {
    var addressInput = adForm.querySelector('#address');
    var pinTop = parseInt(window.data.mainPin.style.top.replace('px', ''), 10) + window.data.mainPin.offsetHeight;
    var pinLeft = parseInt(window.data.mainPin.style.left.replace('px', ''), 10) + Math.round(window.data.mainPin.offsetWidth / 2);

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
        setMinPrice(window.data.typeMap[types[i].value].minPrice);
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

    window.util.disabledChildren(adForm);
  };

  window.form = {
    setAddress: setAddress,
    enable: formEnable,
    disable: formDisable
  };
})();
