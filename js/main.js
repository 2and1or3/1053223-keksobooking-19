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
var bookings = [];

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
    var locationX = getRandom(WIDTH_RESULT) + 'px';
    var locationY = getRandom(HEIGHT_RESULT) + MIN_COORDINATE_Y + 'px';

    var booking = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: '',
        address: locationX + ', ' + locationY,
        price: getRandom(10000),
        type: APARTAMENT_TYPES[getRandom(APARTAMENT_TYPES.length - 1)],
        rooms: getRandom(8),
        guests: getRandom(10),
        checkin: ARRIVE_TIMES[getRandom(ARRIVE_TIMES.length - 1)],
        checkout: ARRIVE_TIMES[getRandom(ARRIVE_TIMES.length - 1)],
        features: getRandomArray(APARTAMENT_FEATURES, APARTAMENT_FEATURES.length - 1),
        description: '',
        photos: getRandomArray(APARTAMENT_PHOTOS, APARTAMENT_PHOTOS.length - 1),
        location: {
          x: locationX,
          y: locationY
        }
      }
    };

    arr.push(booking);
  }

  return arr;
};

bookings = getBookings();

mapElement.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content
  .querySelector('button');
var pinList = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

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
