'use strict';

var mapElement = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

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

var pinTemplate = document.querySelector('#pin').content
  .querySelector('button');
var pinList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var cardTemplate = document.querySelector('#card').content
  .querySelector('.map__card');

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

mapElement.classList.remove('map--faded');

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

  cardElement.querySelector('.popup__features').remove();

  var cardFeatures = document.createElement('ul');
  cardFeatures.classList.add('popup__features');

  for (var j = 0; j < cardData.offer.features.length; j++) {
    var listItem = document.createElement('li');
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + cardData.offer.features[j]);

    cardFeatures.appendChild(listItem);
  }

  cardElement.insertBefore(cardFeatures, cardDescription);

  for (var k = 0; k < cardData.offer.photos.length; k++) {
    var imageTemplate = cardPhotos.querySelector('.popup__photo')
      .cloneNode(true);

    imageTemplate.src = cardData.offer.photos[k];

    cardPhotos.appendChild(imageTemplate);
  }

  cardPhotos.querySelector('.popup__photo:first-child')
    .remove();

  return cardElement;
};

fragment.appendChild(renderCard(bookings[0]));

mapElement.appendChild(fragment);
