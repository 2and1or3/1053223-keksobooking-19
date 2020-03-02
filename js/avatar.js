'use strict';

(function () {
  var userChooser = document.querySelector('.ad-form__field input[type=file]');
  var userPreview = document.querySelector('.ad-form-header__preview img');

  var bookingChooser = document.querySelector('.ad-form__upload input[type=file]');
  var bookingPreview = document.querySelector('.ad-form__photo img');

  var previews = [];

  var makePreviewer = function (fileChooser, preview) {
    previews.push(preview);

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];

      if (file) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  makePreviewer(userChooser, userPreview);
  makePreviewer(bookingChooser, bookingPreview);

  window.previews = previews;
})();
