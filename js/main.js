'use strict';

var mapElement = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapForm = mapElement.querySelector('.map__filters');
var fragment = document.createDocumentFragment();

var APARTAMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ARRIVE_TIMES = ['12:00', '13:00', '14:00'];
var APARTAMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTAMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BOOKINGS_COUNT = 8;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var HEIGHT_RESULT = MAX_COORDINATE_Y - MIN_COORDINATE_Y - mainPin.offsetHeight;
var WIDTH_RESULT = mapElement.offsetWidth - mainPin.offsetWidth;

var MAX_PRICE = 10000;
var MAX_ROOMS = 8;
var MAX_GUESTS = 10;

var ENTER_KEY = 13;

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomArray = function (array, max) {
  var arr = [];

  for (var i = 0; i < getRandom(max); i++) {
    arr[i] = array[i];
  }

  return arr;
};

var cutStringPx = function (str) {
  return str.slice(0, str.length - 2);
};

var getBookings = function () {
  var arr = [];

  for (var i = 0; i < BOOKINGS_COUNT; i++) {
    var locationX = getRandom(WIDTH_RESULT);
    var locationY = getRandom(HEIGHT_RESULT) + MIN_COORDINATE_Y;

    var booking = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: locationX + ', ' + locationY,
        price: getRandom(MAX_PRICE),
        type: APARTAMENT_TYPES[getRandom(APARTAMENT_TYPES.length - 1)],
        rooms: getRandom(MAX_ROOMS) + 1,
        guests: getRandom(MAX_GUESTS) + 1,
        checkin: ARRIVE_TIMES[getRandom(ARRIVE_TIMES.length - 1)],
        checkout: ARRIVE_TIMES[getRandom(ARRIVE_TIMES.length - 1)],
        features: getRandomArray(APARTAMENT_FEATURES, APARTAMENT_FEATURES.length - 1),
        description: 'Описание',
        photos: getRandomArray(APARTAMENT_PHOTOS, APARTAMENT_PHOTOS.length),
        location: {
          x: locationX + 'px',
          y: locationY + 'px'
        }
      }
    };

    arr.push(booking);
  }

  return arr;
};

var bookings = getBookings();

var makePins = function () {
  var pinTemplate = document.querySelector('#pin').content
    .querySelector('button');
  var pinList = document.querySelector('.map__pins');

  var renderPin = function (pinData) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pinData.offer.location.x;
    pinElement.style.top = pinData.offer.location.y;

    var pinImgElement = pinElement.querySelector('img');
    pinImgElement.src = pinData.author.avatar;
    pinImgElement.alt = pinData.offer.title;

    return pinElement;
  };

  for (var i = 0; i < BOOKINGS_COUNT; i++) {
    fragment.appendChild(renderPin(bookings[i]));
  }

  pinList.appendChild(fragment);
};

var makeCards = function () {
  var cardTemplate = document.querySelector('#card').content
    .querySelector('.map__card');

  var typeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var renderCard = function (cardData) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardTitle = cardElement.querySelector('.popup__title');
    var cardAddress = cardElement.querySelector('.popup__text--address');
    var cardPrice = cardElement.querySelector('.popup__text--price');
    var cardType = cardElement.querySelector('.popup__type');
    var cardCapacity = cardElement.querySelector('.popup__text--capacity');
    var cardTime = cardElement.querySelector('.popup__text--time');
    var cardDescription = cardElement.querySelector('.popup__description');
    var cardPhotos = cardElement.querySelector('.popup__photos');
    var cardAvatar = cardElement.querySelector('.popup__avatar');

    cardTitle.textContent = cardData.offer.title;
    cardAddress.textContent = cardData.offer.address;
    cardPrice.textContent = cardData.offer.price + '₽/ночь';
    cardType.textContent = typeMap[cardData.offer.type];
    cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    cardDescription.textContent = cardData.offer.description;
    cardAvatar.src = cardData.author.avatar;

    var cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.innerHTML = '';

    for (var j = 0; j < cardData.offer.features.length; j++) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + cardData.offer.features[j]);

      cardFeatures.appendChild(listItem);
    }

    var fragmentImgContainer = document.createDocumentFragment();

    for (var k = 0; k < cardData.offer.photos.length; k++) {
      var imageTemplate = cardPhotos.querySelector('.popup__photo')
        .cloneNode(true);

      imageTemplate.src = cardData.offer.photos[k];

      fragmentImgContainer.appendChild(imageTemplate);
    }
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(fragmentImgContainer);

    return cardElement;
  };

  fragment.appendChild(renderCard(bookings[0]));
  mapElement.appendChild(fragment);
};

var disabledChildren = function (parent) {
  var children = parent.children;

  for (var i = 0; i < children.length; i++) {
    children[i].disabled = true;
  }
};

var enabledChildren = function (parent) {
  var children = parent.children;

  for (var i = 0; i < children.length; i++) {
    children[i].disabled = false;
  }
};

var setAddress = function () {
  var addressInput = adForm.querySelector('#address');
  var pinTop = parseInt(cutStringPx(mainPin.style.top), 10) + mainPin.offsetHeight;
  var pinLeft = parseInt(cutStringPx(mainPin.style.left), 10) + Math.round(mainPin.offsetWidth / 2);

  addressInput.value = pinTop + ', ' + pinLeft;
};

var appActive = function () {
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  enabledChildren(adForm);
  enabledChildren(mapForm);

  makePins();
  makeCards();
};

var appDisabled = function () {
  if (!mapElement.classList.contains('map--faded')) {
    mapElement.classList.add('map--faded');
  }

  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.add('ad-form--disabled');
  }

  disabledChildren(adForm);
  disabledChildren(mapForm);

  setAddress();
};

appDisabled();

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    appActive();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    appActive();
  }
});

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
