'use strict';

var APARTAMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ARRIVE_TIMES = ['12:00', '13:00', '14:00'];
var APARTAMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTAMENT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
                         'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
                         'http://o0.github.io/assets/images/tokyo/hotel3.jpg',];
var BOOKINGS_COUNT = 8;
var bookings = [];

var mapElement = document.querySelector('.map');

var getRandom = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var getRandomArray = function (array, max) {
  var arr = [];

  for (var i = 0; i < getRandom(max); i++) {
    arr[i] = array[i];
  }

  return arr;
}

var mainPin = document.querySelector('.map__pin--main');

var getBookings = function() {
  var arr = [];

 for (var i = 0; i < BOOKINGS_COUNT; i++) {
   var locationX = getRandom(mapElement.offsetWidth - (mainPin.offsetWidth / 2)) + 'px';
   var locationY = getRandom(500 - mainPin.offsetHeight) + 130 + 'px';

   var booking = {
     author: {
       avatar: 'img/avatars/user0' + (i + 1) + '.png'
     },
     offer: {
       title: '',
       address: locationX + ', ' + locationY,
       price: getRandom(10000),
       type: APARTAMENT_TYPES[getRandom(4)],
       rooms: getRandom(8),
       guests: getRandom(10),
       checkin: ARRIVE_TIMES[getRandom(3)],
       checkout: ARRIVE_TIMES[getRandom(3)],
       features: getRandomArray(APARTAMENT_FEATURES, 6),
       description: '',
       photos: getRandomArray(APARTAMENT_PHOTOS, 3),
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

  console.log(pinImgElement);
  return pinElement;
};

for (var i = 0; i < BOOKINGS_COUNT; i++) {
  fragment.appendChild(renderPin(bookings[i]));
}

pinList.appendChild(fragment);
