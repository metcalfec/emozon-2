var productsTemp = [
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    image: "http://ecx.images-amazon.com/images/I/51zFTdNilAL._SX377_BO1,204,203,200_.jpg",
    price: 21.57,
    description: [
      "The essential elements of programming, including syntax, control, and data",
      "How to organize and clarify your code with object-oriented and functional programming techniques",
      "How to script the browser and make basic web applications",
      "How to use the DOM effectively to interact with browsers",
      "How to harness Node.js to build servers and utilities"
    ],
    keywords: ["book", "javascript"]
  },
  {
    name: "JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)",
    image: "http://ecx.images-amazon.com/images/I/51WD-F3GobL.jpg",
    price: 33.89,
    description: [],
    keywords: ["book", "javascript"]
  },
  {
    name: "Sony KDL32R300C 32-Inch 720p LED TV (2015 Model)",
    image: "http://ecx.images-amazon.com/images/I/81RstnIX0iL._SL1500_.jpg",
    price: 149.99,
    keywords: ["tv", "television"]
  }
]
var cartCount = 0;

$(document).ready(function() {
  $('#search-btn').on('click', function(event) {
    event.preventDefault();
    findItem($('#search-txt').val());
  });
  $('#results').on('click', '.product-title', function(event) {
    for (var i = 0; i < productsTemp.length; i++) {
      if ($(this).text() === productsTemp[i].name) {
        showItem(productsTemp[i]);
      }
    }
  })
  $('#product').on('click', '.add-to-cart', function() {

    $('#cart-count').text(cartUpdate());
    $('#cart-count').show( "bounce", 500);


  })
  $('.navbar-brand').on('click', function() {
    $('#results').empty();
    $('#product').empty();
    $('#carousel-ads').show();
  });
});

function findItem(item) {
  $('#product').empty();
  $('#results').empty();
  $('#carousel-ads').hide();
  for (var i = 0; i < productsTemp.length; i++) {
    for (var j = 0; j < productsTemp[i].keywords.length; j++) {
      if (productsTemp[i].keywords[j] === item.toLowerCase()) {
        var resultCol = $('<div class="col-md-3 product-col"></div>');
        var resultThumb = $('<a  class="thumbnail" href="#"></a>');
        var resultImg = $('<img class="product-img" src="' + productsTemp[i].image + '">')
        var resultTitleDiv = $('<div>')
        var resultTitle = $('<h5 class="product-title">' + productsTemp[i].name + '</h5>')
        var resultPrice = $('<p class="product-price">$' + productsTemp[i].price + '</p>')
        $('#results').append(resultCol);
        $(resultCol).append(resultThumb);
        $(resultThumb).append(resultImg);
        $(resultThumb).append(resultTitleDiv);
        $(resultTitleDiv).append(resultTitle);
        $(resultTitleDiv).append(resultPrice);
      }
    }
  }
}

function showItem(object) {
  $('#results').empty();
  var prodMediaCol = $('<div class="col-md-10"></div>');
  var prodMedia = $('<div class="media"></div>');
  var prodMediaLeft = $('<div class="media-left"></div>');
  var prodMediaImg = $('<img class="product-img" src="' + object.image + '">');
  var prodMediaBody = $('<div class="media-body"></div>');
  var prodMediaHeading = $('<h3 class="media-heading">' + object.name + '</h3>');
  var prodHR = $('<hr>');
  var prodMediaPrice = $('<p>Price: <span class="media-price">$' + object.price + '</span></p>');
  var prodMediaAboutUL = $('<ul class="media-ul"></ul>');
  var prodAddCol = $('<div class="col-md-2 add-col"></div>');
  var prodAdd = $('<button class="btn btn-warning add-to-cart">Add to Cart</button>');
  displayList(object.description, prodMediaAboutUL);
  $('#product').append(prodMediaCol);
  $(prodMediaCol).append(prodMedia);
  $(prodMedia).append(prodMediaLeft);
  $(prodMediaLeft).append(prodMediaImg);
  $(prodMedia).append(prodMediaBody);
  $(prodMediaBody).append(prodMediaHeading);
  $(prodMediaBody).append(prodHR);
  $(prodMediaBody).append(prodMediaPrice);
  $(prodMediaBody).append(prodMediaAboutUL);
  $('#product').append(prodAddCol);
  $(prodAddCol).append(prodAdd);
}

//Appending Item Description Function
function displayList(array, parent) {
  if (array.length !== 0) {
    var productMediaAboutLi = [];
    for (var i = 0; i < array.length; i++) {
      productMediaAboutLi[i] = $('<li>' + array[i] + '</li>');
      $(parent).append(productMediaAboutLi[i]);
    }
  }
}

function cartUpdate() {
  cartCount++;
  return cartCount;
}
