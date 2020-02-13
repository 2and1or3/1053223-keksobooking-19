'use strict';

(function () {
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

  var mapElement = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var mapEnableHeight = MAX_COORDINATE_Y - MIN_COORDINATE_Y - mainPin.offsetHeight;
  var mapEnableWidth = mapElement.offsetWidth - mainPin.offsetWidth;


  var getBookings = function () {
    var arr = [];

    for (var i = 0; i < BOOKINGS_COUNT; i++) {
      var locationX = window.util.getRandom(mapEnableWidth);
      var locationY = window.util.getRandom(mapEnableHeight) + MIN_COORDINATE_Y;
      var booking = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Заголовок',
          address: locationX + ', ' + locationY,
          price: window.util.getRandom(MAX_PRICE),
          type: APARTAMENT_TYPES[window.util.getRandom(APARTAMENT_TYPES.length - 1)],
          rooms: window.util.getRandom(MAX_ROOMS) + 1,
          guests: window.util.getRandom(MAX_GUESTS) + 1,
          checkin: ARRIVE_TIMES[window.util.getRandom(ARRIVE_TIMES.length - 1)],
          checkout: ARRIVE_TIMES[window.util.getRandom(ARRIVE_TIMES.length - 1)],
          features: window.util.getRandomArray(APARTAMENT_FEATURES, APARTAMENT_FEATURES.length - 1),
          description: 'Описание',
          photos: window.util.getRandomArray(APARTAMENT_PHOTOS, APARTAMENT_PHOTOS.length),
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

  window.data = {
    bookings: bookings,
    minCoordinateY: MIN_COORDINATE_Y,
    maxCoordinateY: MAX_COORDINATE_Y
  };
})();
