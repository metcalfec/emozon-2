var productsTemp = [
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    image: "http://ecx.images-amazon.com/images/I/51zFTdNilAL._SX377_BO1,204,203,200_.jpg",
    price: 21.57,
    stock: 100,
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
    stock: 100,
    description: [
      "Since 1996, JavaScript: The Definitive Guide has been the bible for JavaScript programmers—a programmer's guide and comprehensive reference to the core language and to the client-side JavaScript APIs defined by web browsers. The 6th edition covers HTML5 and ECMAScript 5. Many chapters have been completely rewritten to bring them in line with today's best web development practices. New chapters in this edition document jQuery and server side JavaScript. It's recommended for experienced programmers who want to learn the programming language of the Web, and for current JavaScript programmers who want to master it."
    ],
    keywords: ["book", "javascript"]
  },
  {
    name: "Sony KDL32R300C 32-Inch 720p LED TV (2015 Model)",
    image: "http://ecx.images-amazon.com/images/I/81RstnIX0iL._SL1500_.jpg",
    description: [
      "Refresh Rate: 60Hz (Native); Motionflow XR120 (Effective)",
      "Backlight: LED (Direct-Lit)",
      "Smart Functionality: No",
      "Crisp detail & contrast with Clear Resolution Enhancer",
      "Superior picture delivered via Direct-lit LED panel",
      "Inputs: 2 HDMI, 1 USB"
    ],
    price: 149.99,
    stock: 100,
    keywords: ["tv", "television"]
  }
]

var cartContents = [];

//Search for products event
$('#search-btn').on('click', function(event) {
  event.preventDefault();
  findItem($('#search-txt').val());
});

//Display products event
$('#results').on('click', '.product-title', function(event) {
  for (var i = 0; i < productsTemp.length; i++) {
    if ($(this).text() === productsTemp[i].name) {
      showItem(productsTemp[i]);
    }
  }
})

//Home button event
$('.navbar-brand').on('click', function() {
  $('#results').empty();
  $('#product').empty();
  $('#carousel-ads').show();
});

//Add product to cart event
$('#product').on('click', '.add-to-cart', function() {
  var quantity = $('#product').find('.qty').val();
  var currentItem = {};
  var addedSum = 0;
  for (var i = 0; i < productsTemp.length; i++) {
    if ($('#product').find('.media-heading').text() === productsTemp[i].name) {
      currentItem = productsTemp[i];
      for (var j = 0; j < quantity; j++) {
        cartContents.push(productsTemp[i])
      }
    }
  }
  $('.modal-header').empty();
  $('.modal-body').empty();
  addedSum += currentItem.price * quantity;
  if (quantity == 1) {
    var addedModalTitle = $('<h4 class="modal-title">' + quantity +' Item Added to Cart</h4>');
  } else {
    var addedModalTitle = $('<h4 class="modal-title">' + quantity +' Items Added to Cart</h4>');
  }
  var addedModalClose = $('<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>');
  var addedMedia = $('<div class="media"></div>');
  var addedMediaLeft = $('<div class="media-left"></div>');
  var addedMediaObject = $('<img class="media-object cart-added-img" src="' + currentItem.image + '">');
  var addedMediaBody = $('<div class="media-body"></div>');
  var addedMediaHeading = $('<div class="media-heading">' + truncate(currentItem.name, 60) + '</div>');
  var addedMediaPrice = $('<p class="cart-added-price pull-right"><strong>Cart subtotal </strong>' + subTotalPreview() + '</p>');
  $('.modal-header').append(addedModalClose);
  $('.modal-header').append(addedModalTitle);
  $('.modal-body').append(addedMedia);
  $(addedMedia).append(addedMediaLeft);
  $(addedMediaLeft).append(addedMediaObject);
  $(addedMedia).append(addedMediaBody);
  $(addedMediaBody).append(addedMediaHeading);
  $(addedMediaBody).append(addedMediaPrice);
  $('#cartAddModal').modal('show');
  $('#cart-count').text(cartContents.length).show( "bounce", 500);
})

//Display product results
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

//Display product detail function
function showItem(object) {
  $('#results').empty();
  var prodMediaCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
  var prodMedia = $('<div class="media"></div>');
  var prodMediaLeft = $('<div class="media-left"></div>');
  var prodMediaImg = $('<img class="product-img" src="' + object.image + '">');
  var prodMediaBody = $('<div class="media-body"></div>');
  var prodMediaHeading = $('<h3 class="media-heading">' + object.name + '</h3>');
  var prodHR = $('<hr>');
  var prodMediaPrice = $('<p>Price: <span class="media-price">$' + object.price + '</span></p>');
  var prodMediaAboutUL = $('<ul class="media-ul"></ul>');
  var prodAddCol = $('<div class="col-xs-2 col-sm-2 col-md-2 add-col text-center"></div>');
  var prodQtyForm = $('<form class="form-inline"></form>');
  var prodQtyGroup = $('<div class="form-group quantity"></div>');
  var prodQtyText = $('<div class="form-control-static">Qty:</div>');
  var prodQty = $('<select class="form-control qty"></select');
  var prodAdd = $('<button class="btn btn-warning add-to-cart">Add to Cart</button>');
  $('#product').append(prodMediaCol);
  $(prodMediaCol).append(prodMedia);
  $(prodMedia).append(prodMediaLeft);
  $(prodMediaLeft).append(prodMediaImg);
  $(prodMedia).append(prodMediaBody);
  $(prodMediaBody).append(prodMediaHeading);
  $(prodMediaBody).append(prodHR);
  $(prodMediaBody).append(prodMediaPrice);
  $('#product').append(prodAddCol);
  $(prodAddCol).append(prodQtyForm);
  $(prodQtyForm).append(prodQtyGroup);
  $(prodQtyGroup).append(prodQtyText);
  $(prodQtyGroup).append(prodQty);
  $(prodAddCol).append(prodAdd);
  if (object.description.length === 1) {
    displayHelper(object.description, prodMediaBody, "prodMediaAboutP", "p");
  } else {
    displayHelper(object.description, prodMediaAboutUL, "prodMediaAboutLi", "li");
    $(prodMediaBody).append(prodMediaAboutUL);
  }
  displayHelper(object.stock, prodQty, "prodQtyOption");
}

//Appending Item Description Function
function displayHelper(data, parent, child, el) {
  if (typeof data === 'object') {
    var child = [];
    for (var i = 0; i < data.length; i++) {
      child[i] = $('<' + el + '>' + data[i] + '</' + el + '>');
      $(parent).append(child[i]);
    }
  } else if (typeof data === 'number') {
    for (var i = 1; i < data + 1; i++) {
      child = $('<option>' + i + '</option>');
      $(parent).append(child);
    }
  }
}

//Truncate title Function
function truncate(string, amount) {
  var truncated = "";
  var i = 0;
  do {
    truncated += (string[i]);
    i++;
  }
  while (i < amount && i < string.length);
  if (amount > string.length) {
    return truncated;
  } else {
    truncated += '...';
    return truncated;
  }
}

//Cart SubTotal Preview Function
function subTotalPreview() {
  var numItems = cartContents.length;
  var total = 0;
  var subTotalMsg;
  for (var i = 0; i < numItems; i++) {
    total += cartContents[i].price;
  }
  if (numItems > 1) {
    subTotalMsg = '(' + numItems + ' items): $' + total.toFixed(2);
    return subTotalMsg;
  } else {
    subTotalMsg = '(' + numItems + ' item): $' + total.toFixed(2);
    return subTotalMsg;
  }
}
