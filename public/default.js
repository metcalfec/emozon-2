var productsTemp = [
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    image: "http://ecx.images-amazon.com/images/I/51zFTdNilAL._SX377_BO1,204,203,200_.jpg",
    price: 21.57,
    keywords: ["book", "javascript"]
  },
  {
    name: "Sony KDL32R300C 32-Inch 720p LED TV (2015 Model)",
    image: "http://ecx.images-amazon.com/images/I/81RstnIX0iL._SL1500_.jpg",
    price: 149.99,
    keywords: ["tv", "television"]
  }
]

$(document).ready(function() {
  $('#search-btn').on('click', function(event) {
    event.preventDefault();
    findItem($('#search-txt').val());
  });
  $('#results').on('click', '.product-title', function(event) {
    for (var i = 0; i < productsTemp.length; i++) {
      if ($(this).text() === productsTemp[i].name) {
        $('#results').hide();
        showItem(productsTemp[i]);
      }
    }
  })
  $('.navbar-brand').on('click', function() {
    $('#results').hide();
    $('#product').hide();
    $('#carousel-ads').show();
  });
});

function findItem(item) {
  for (var i = 0; i < productsTemp.length; i++) {
    for (var j = 0; j < productsTemp[i].keywords.length; j++) {
      if (productsTemp[i].keywords[j] === item.toLowerCase()) {
        var productCol = $('<div class="col-md-3 product-col"></div>');
        var productThumb = $('<div class="thumbnail"></div>');
        var productImg = $('<img class="product-img" src="' + productsTemp[i].image + '">')
        var productTitleDiv = $('<div>')
        var productTitle = $('<a href="#"><h5 class="product-title">' + productsTemp[i].name + '</h5></a>')
        var productPrice = $('<p class="product-price">$' + productsTemp[i].price + '</p>')
        $('#carousel-ads').hide();
        $('#results').append(productCol);
        $(productCol).append(productThumb);
        $(productThumb).append(productImg);
        $(productThumb).append(productTitleDiv);
        $(productTitleDiv).append(productTitle);
        $(productTitleDiv).append(productPrice);
        return productsTemp[i];
      }
    }
  }
}

function showItem(object) {
  var productCol = $('<div class="col-md-4 product-col"></div>');
  var productImg = $('<img class="product-img" src="' + object.image + '">')
  $('#product').append(productCol);
  $(productCol).append(productImg);
}
