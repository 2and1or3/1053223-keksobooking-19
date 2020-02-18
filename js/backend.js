'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var statusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var dataFrom = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время выполнение запроса: ' + xhr.timeout + ' MS');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: dataFrom
  };
})();
