'use strict';

var APARTAMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ARRIVE_TIMES = ['12:00', '13:00', '14:00'];
var APARTAMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTAMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BOOKINGS_COUNT = 8;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;

var MAX_PRICE = 10000;
var MAX_ROOMS = 8;
var MAX_GUESTS = 10;

var ENTER_KEY = 13;
var ESC_KEY = 27;

var mapElement = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapForm = mapElement.querySelector('.map__filters');
var fragment = document.createDocumentFragment();

var mapEnableHeight = MAX_COORDINATE_Y - MIN_COORDINATE_Y - mainPin.offsetHeight;
var mapEnableWidth = mapElement.offsetWidth - mainPin.offsetWidth;

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

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(++max));
};

var getRandomArray = function (array, max) {
  var arr = [];

  for (var i = 0; i < getRandom(max); i++) {
    arr[i] = array[i];
  }

  return arr;
};

var getBookings = function () {
  var arr = [];

  for (var i = 0; i < BOOKINGS_COUNT; i++) {
    var locationX = getRandom(mapEnableWidth);
    var locationY = getRandom(mapEnableHeight) + MIN_COORDINATE_Y;

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
      },
      id: i
    };

    arr.push(booking);
  }

  return arr;
};

var bookings = getBookings();


var pinTemplate = document.querySelector('#pin').content
  .querySelector('button');
var pinList = document.querySelector('.map__pins');

var renderPin = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pinData.offer.location.x;
  pinElement.style.top = pinData.offer.location.y;

  pinElement.dataset.id = pinData.id;

  var pinImgElement = pinElement.querySelector('img');
  pinImgElement.src = pinData.author.avatar;
  pinImgElement.alt = pinData.offer.title;

  return pinElement;
};

var makePins = function () {

  for (var i = 0; i < BOOKINGS_COUNT; i++) {
    fragment.appendChild(renderPin(bookings[i], i));
  }

  pinList.appendChild(fragment);
};

var cardTemplate = document.querySelector('#card').content
  .querySelector('.map__card');

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
  cardType.textContent = typeMap[cardData.offer.type].label;
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

var onCloseClick = function () {
  deleteCard();
};

var onPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    deleteCard();
  }
};

var makeCard = function (index) {

  if (mapElement.querySelector('.map__card')) {
    deleteCard();
  }

  fragment.appendChild(renderCard(bookings[index]));
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
  var pinTop = parseInt(mainPin.style.top.replace('px', ''), 10) + mainPin.offsetHeight;
  var pinLeft = parseInt(mainPin.style.left.replace('px', ''), 10) + Math.round(mainPin.offsetWidth / 2);

  addressInput.value = pinTop + ', ' + pinLeft;
};

var activateApp = function () {
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  enabledChildren(adForm);
  enabledChildren(mapForm);

  makePins();
  makeCard(0);
  mainPin.removeEventListener('mousedown', onMainPinClick);
  mainPin.removeEventListener('keydown', onMainPinPress);
};

var disableApp = function () {
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

disableApp();

var onMainPinClick = function (evt) {
  if (evt.button === 0) {
    activateApp();
  }
};
var onMainPinPress = function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    activateApp();
  }
};

mainPin.addEventListener('mousedown', onMainPinClick);

mainPin.addEventListener('keydown', onMainPinPress);

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
  if (evt.keyCode === ENTER_KEY) {
    showCard(evt);
  }
});
