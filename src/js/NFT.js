import $ from 'jquery';
// $(document).ready(function () {
//   $.ajax({
//     url: 'https://strapi-demo-app-ku48.onrender.com/api/cards?populate=*',
//     method: 'GET',
//     contentType: JSON,
//     success: function (responseData) {
//       console.log(responseData);
//       responseData.data.forEach(function (item) {
//         let cardDiv = $('<div id="cardNFT"></div>');
//         let imageContainer = $('<div id="image__container"></div>');
//         let footerCard = $('<div id="footer__card"></div>');
//         $('#content').append(cardDiv);
//         cardDiv.append(
//           '<h2 id="card__name"> ' + item.attributes.name + '</h2>'
//         );
//         cardDiv.append(imageContainer);
//         imageContainer.append(
//           '<img src="' + item.attributes.img.data.attributes.url + '"/>'
//         );
//         cardDiv.append(
//           '<div id="card__title"> ' + item.attributes.title + '</div>'
//         );
//         cardDiv.append('<p id="card__about">' + item.attributes.about + '</p>');
//         cardDiv.append(footerCard);
//         footerCard.append(
//           '<div id="card__price"> ' + item.attributes.price + '</div>',
//           '<button type="button" id="button__card">Buy now</button>'
//         );
//       });
//     },
//     error: function (error) {
//       console.error('Ошибка при получении данных', error);
//     },
//   });
// });
$(document).ready(function () {
  let totalItems = 0;
  let currentPage = 1;
  let responseData;
  const itemsPerPage = getItemsPerPage();

  function getItemsPerPage() {
    if ($(window).width() < 450) {
      return 4;
    } else {
      return 12;
    }
  }

  function displayCards(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    $('#content').empty();

    for (let i = startIndex; i < endIndex; i++) {
      const item = responseData.data[i];
      let cardDiv = $('<div class="cardNFT"></div>');
      let imageContainer = $('<div class="image__container"></div>');
      let footerCard = $('<div class="footer__card"></div>');

      cardDiv.append(
        '<h2 class="card__name"> ' + item.attributes.name + '</h2>'
      );
      cardDiv.append(imageContainer);
      imageContainer.append(
        '<img src="' + item.attributes.img.data.attributes.url + '"/>'
      );
      cardDiv.append(
        '<div class="card__title"> ' + item.attributes.title + '</div>'
      );
      cardDiv.append(
        '<p class="card__about">' + item.attributes.about + '</p>'
      );
      cardDiv.append(footerCard);
      footerCard.append(
        '<div class="card__price"> ' + item.attributes.price + '</div>',
        '<button type="button" class="button__card">Buy now</button>'
      );

      $('#content').append(cardDiv);
    }
  }

  function createPaginationButtons() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    $('#pagination').empty();
    const prevButton = $(
      '<button class="pagination-button custom-svg-button" onclick="prevPage()">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
        '<path d="M13.41 6.99981L9.17 11.2898C9.07628 11.3828 9.00188 11.4934 8.95111 11.6152C8.90034 11.7371 8.87421 11.8678 8.87421 11.9998C8.87421 12.1318 8.90034 12.2625 8.95111 12.3844C9.00188 12.5062 9.07628 12.6168 9.17 12.7098L13.41 16.9498C13.503 17.0435 13.6136 17.1179 13.7354 17.1687C13.8573 17.2195 13.988 17.2456 14.12 17.2456C14.252 17.2456 14.3827 17.2195 14.5046 17.1687C14.6264 17.1179 14.737 17.0435 14.83 16.9498C15.0163 16.7624 15.1208 16.509 15.1208 16.2448C15.1208 15.9806 15.0163 15.7272 14.83 15.5398L11.29 11.9998L14.83 8.45981C15.0147 8.27355 15.1189 8.02215 15.12 7.75981C15.1208 7.6282 15.0955 7.49774 15.0458 7.3759C14.996 7.25406 14.9227 7.14325 14.83 7.04981C14.7404 6.95273 14.6324 6.87438 14.5123 6.81927C14.3923 6.76416 14.2625 6.7334 14.1304 6.72875C13.9984 6.7241 13.8667 6.74566 13.7431 6.79218C13.6194 6.83871 13.5062 6.90928 13.41 6.99981Z" fill="#C8D2DC"/>' +
        '</svg>' +
        '</button>'
    );
    $('#pagination').append(prevButton);
    for (let i = 1; i <= totalPages; i++) {
      const button = $(
        '<button class="pagination-button" onclick="changePage(' +
          i +
          ')">' +
          i +
          '</button>'
      );
      if (i === currentPage) {
        button.addClass('active');
      }
      $('#pagination').append(button);
    }

    const nextButton = $(
      '<button class="pagination-button custom-svg-button" onclick="nextPage()">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
        '<path d="M10.59 17.0002L14.83 12.7102C14.9237 12.6172 14.9981 12.5066 15.0489 12.3848C15.0997 12.2629 15.1258 12.1322 15.1258 12.0002C15.1258 11.8682 15.0997 11.7375 15.0489 11.6156C14.9981 11.4938 14.9237 11.3832 14.83 11.2902L10.59 7.05019C10.497 6.95646 10.3864 6.88207 10.2646 6.8313C10.1427 6.78053 10.012 6.75439 9.88 6.75439C9.74798 6.75439 9.61728 6.78053 9.49542 6.8313C9.37356 6.88207 9.26296 6.95646 9.17 7.05019C8.98374 7.23755 8.8792 7.49101 8.8792 7.75519C8.8792 8.01938 8.98374 8.27283 9.17 8.46019L12.71 12.0002L9.16999 15.5402C8.98525 15.7265 8.8811 15.9779 8.87999 16.2402C8.87923 16.3718 8.90446 16.5023 8.95422 16.6241C9.00399 16.7459 9.07731 16.8568 9.16999 16.9502C9.25961 17.0473 9.36758 17.1256 9.48765 17.1807C9.60773 17.2358 9.73754 17.2666 9.86957 17.2713C10.0016 17.2759 10.1333 17.2543 10.2569 17.2078C10.3806 17.1613 10.4938 17.0907 10.59 17.0002Z" fill="#C8D2DC"/>' +
        '</svg>' +
        '</button>'
    );
    $('#pagination').append(nextButton);
  }

  function updatePaginationButtons() {
    $('.pagination-button').removeClass('active');
    $(`.pagination-button:contains(${currentPage})`).addClass('active');
  }

  window.changePage = function (page) {
    currentPage = page;
    displayCards(currentPage);
    updatePaginationButtons();
  };

  window.prevPage = function () {
    if (currentPage > 1) {
      currentPage--;
      changePage(currentPage);
    }
  };

  window.nextPage = function () {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      changePage(currentPage);
    }
  };

  $.ajax({
    url: 'https://strapi-demo-app-ku48.onrender.com/api/cards?populate=*',
    method: 'GET',
    contentType: 'application/json',
    success: function (response) {
      responseData = response;
      totalItems = responseData.data.length;
      displayCards(currentPage);
      createPaginationButtons();
    },
    error: function (error) {
      console.error('Ошибка при получении данных', error);
    },
  });
});

//  url: 'https://strapi-demo-app-ku48.onrender.com/admin/apicards/?populate=*'
