'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var setAddress = function () {
    var addressInput = adForm.querySelector('#address');
    var pinTop = parseInt(mainPin.style.top.replace('px', ''), 10) + mainPin.offsetHeight;
    var pinLeft = parseInt(mainPin.style.left.replace('px', ''), 10) + Math.round(mainPin.offsetWidth / 2);

    addressInput.value = pinTop + ', ' + pinLeft;
  };

  var roomControl = adForm.querySelector('#room_number');
  var guestControl = adForm.querySelector('#capacity');

  var getCurrentGuest = function () {
    var guests = guestControl.children;

    for (var i = 0; i < guests.length; i++) {
      if (guests[i].selected) {
        return i;
      }
    }
    return i;
  };

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
      if (lastRoomIndex < getCurrentGuest()) {
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

  guestControl.addEventListener('change', getCurrentGuest);

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
        setMinPrice(window.util.typeMap[types[i].value].minPrice);
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

  window.form = {
    setAddress: setAddress
  };

})();
