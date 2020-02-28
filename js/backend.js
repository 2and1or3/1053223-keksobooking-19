'use strict';

(function () {
  var TIMEOUT_IN_MS = 5000;
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';

  var statusCode = {
    OK: 200
  };

  var makeRequest = function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        success(xhr.response);
      } else {
        error('Статус ответа: ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      error('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      error('Превышено время выполнение запроса: ' + xhr.timeout + ' MS');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onLoad, onError) {
    var request = makeRequest(onLoad, onError);

    request.open('GET', GET_URL);
    request.send();
  };

  var save = function (data, onLoad, onError) {
    var request = makeRequest(onLoad, onError);

    request.open('POST', POST_URL);
    request.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
