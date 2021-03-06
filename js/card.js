'use strict';
(function () {
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
    cardType.textContent = window.form.typeMap[cardData.offer.type].label;
    cardCapacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    cardDescription.textContent = cardData.offer.description;
    cardAvatar.src = cardData.author.avatar;

    var cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.innerHTML = '';

    cardData.offer.features.forEach(function (feature) {
      var listItem = document.createElement('li');
      listItem.classList.add('popup__feature');
      listItem.classList.add('popup__feature--' + feature);

      cardFeatures.appendChild(listItem);
    });

    var fragmentImgContainer = document.createDocumentFragment();

    cardData.offer.photos.forEach(function (photo) {
      var imageTemplate = cardPhotos.querySelector('.popup__photo')
        .cloneNode(true);

      imageTemplate.src = photo;

      fragmentImgContainer.appendChild(imageTemplate);
    });
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(fragmentImgContainer);

    return cardElement;
  };

  window.renderCard = renderCard;
})();
