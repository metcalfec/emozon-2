var productsTemp = [
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    by: "Marijn Haverbeke",
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
    by: "David Flanagan",
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
    by: "Sony",
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
  },
  {
    name: "Samsung UN40H5003 40-Inch (39.5-Inch Measured Diagonally)1080p LED TV (2014 Model)",
    by: "Samsung",
    image: "http://ecx.images-amazon.com/images/I/91BZ7U%2Bn1%2BL._SL1500_.jpg",
    description: [
      "Refresh Rate: 60Hz (Native); 120 CMR (Effective)",
      "Backlight: LED (Edge-Lit)",
      "Smart Functionality: No",
      "Dimensions (W x H x D): TV without stand: 36.1\" x 21\" x 3.7\", TV with stand: 36.1\" x 23.3\" x 9\"",
      "Inputs: 2 HDMI, 1 USB, 1 Component In, 1 Composite In",
      "Accessories Included: Standard Remote Control"
    ],
    price: 277.99,
    stock: 30,
    keywords: ["tv", "television"]
  }
]

var cartContents = [];
var saveForLater = [];


////////////////////////////////////////////////////////////////////////////////
//       EVENTS       //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Search for products event
$('#search-btn').on('click', function(event) {
  event.preventDefault();
  findItem($('#search-txt').val());
});

//Display products event
$('#results').on('click', '.thumbnail', function(event) {
  for (var i = 0; i < productsTemp.length; i++) {
    if ($(this).find('.product-title').text() === productsTemp[i].name) {
      showItem(productsTemp[i]);
    }
  }
})

//Home button event
$('.navbar-brand').on('click', function() {
  $('#results').empty();
  $('#product').empty();
  $('#view-cart').find('.cart-items').empty();
  $('#view-cart').find('.cart-head').addClass('hide');
  $('#carousel-ads').show();
  $('#view-cart').find('.empty-cart').hide();
});

//Add product to cart event
$('#product').on('click', '.add-to-cart', function() {
  var quantity = parseInt($('#product').find('.qty').val());
  var currentItem = {};
  var subtotal = 0;
  for (var i = 0; i < productsTemp.length; i++) {
    if ($('#product').find('.media-heading').text() === productsTemp[i].name) {
      currentItem = productsTemp[i];
    }
  }
  quantity = cartQuantity(cartContents, currentItem, quantity);
  $('.modal-header').empty();
  $('.modal-body').empty();
  subtotal += currentItem.price * quantity;
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
  var addedMediaPriceText = $('<h5 class="cart-added-price pull-right">Cart subtotal' + subTotalPreview() + '</h5>');
  var addedMediaPrice = $('<h5 class="cart-added-price pull-right cart-price">$' + calcSubtotal(cartContents).toFixed(2) + '</h5>');
  $('.modal-header').append(addedModalClose);
  $('.modal-header').append(addedModalTitle);
  $('.modal-body').append(addedMedia);
  $(addedMedia).append(addedMediaLeft);
  $(addedMediaLeft).append(addedMediaObject);
  $(addedMedia).append(addedMediaBody);
  $(addedMediaBody).append(addedMediaHeading);
  $(addedMediaBody).append(addedMediaPrice);
  $(addedMediaBody).append(addedMediaPriceText);
  $('#cartAddModal').modal('show');
  $('#cart-count').text(cartCount());
});

//Cart options
$('#view-cart').on('click', '.inline', function(e) {
  e.preventDefault();
  var click = $(this).text();
  var findItem = $(this).closest('.media-body').find('.media-heading').text();
  for (var i = 0; i < cartContents.length; i++) {
    if (cartContents[i][0].name === findItem) {
      switch (click) {
        case "Delete":
          cartContents.splice(i, 1);
          break;
        case "Save for later":
          if (saveForLater.indexOf(cartContents[i][0]) === -1) {
            var saveItem = cartContents.splice(i, 1)
            saveForLater.push(saveItem[0][0]);
          } else {
            cartContents.splice(i, 1);
          }
          break;
      }
    }
  }
  showCart();
  $('#cart-count').text(cartCount());
});

//Add/Remove from list
$('#product').on('click', '.add-remove-link', function() {
  var click = $(this).text();
  var findItem = $(this).closest('#product').find('.media-heading').text();
  for (var i = 0; i < productsTemp.length; i++) {
    if (productsTemp[i].name === findItem) {
      switch (click) {
        case "Add to list":
          saveForLater.push(productsTemp[i]);
          $('#product').empty();
          showItem(productsTemp[i]);
          break;
        case "Remove from list":
          saveForLater.splice(productsTemp[i], 1);
          $('#product').empty();
          showItem(productsTemp[i]);
          break;
      }
    }
  }
});

//Change item quantity
$('#view-cart').on('change', '.cart-qty', function() {
  var itemToChange = $(this).closest('.row').find('.media-heading').first().text();
  var changeQty = parseInt($(this).find('.qty').val());
  for (var i = 0; i < cartContents.length; i++) {
    if (cartContents[i][0].name === itemToChange) {
      cartContents[i][1] = changeQty;
    }
  }
  showCart();
  $('#cart-count').text(cartCount());
});

//Proceed to cart
$('#cartAddModal').on('click', '.btn-primary', function() {
  $('#view-cart').removeClass('hide');
  showCart();
});

//View cart
$('#cart').on('click', function() {
  $('#view-cart').removeClass('hide');
  $('#product').empty();
  $('#results').empty();
  $('#carousel-ads').hide();
  $('#view-cart').find('.cart-items').empty();
  $('#view-cart').find('.cart-head').addClass('hide');
  showCart();
});

//Show saved items
$('.navbar').on('click', 'a', function() {
  if ($(this).text() === "Saved For Later") {
    $('#my-list').popover({
      html: 'true',
      content : function() {
        var content = $('<div></div>');
        if (saveForLater.length === 0) {
          $(content).append('<p class="empty-list">No Saved Items</p>');
        } else {
          for (var i = 0; i < saveForLater.length; i++) {
            var savedLink = $('<a class="my-list-link" href="#"></a>');
            var savedMedia = $('<div class="media"></div>');
            var savedMediaLeft = $('<div class="media-left"></div>');
            var savedMediaObject = $('<img class="media-object cart-added-img" src="' + saveForLater[i].image + '">');
            var savedMediaBody = $('<div class="media-body"></div>');
            var savedMediaHeading = $('<div class="media-heading">' + truncate(saveForLater[i].name, 40) + '</div>');
            $(content).append(savedLink);
            $(savedLink).append(savedMedia);
            $(savedMedia).append(savedMediaLeft);
            $(savedMediaLeft).append(savedMediaObject);
            $(savedMedia).append(savedMediaBody);
            $(savedMediaBody).append(savedMediaHeading);
            if (i !== saveForLater.length - 1) {
              $(content).append('<hr>');
            }
          }
        }
        return content;
      }
    });
    $('#my-list').popover('show');
  }
});

//View saved item product page
$(document).on('click', '.popover-content', function() {
  for (var i = 0; i < productsTemp.length; i++) {
    if ($(this).find('.media-heading').text() === truncate(productsTemp[i].name, 40)) {
      $('#product').empty();
      $('#results').empty();
      $('#carousel-ads').hide();
      $('#view-cart').find('.cart-items').empty();
      $('#view-cart').find('.cart-head').addClass('hide');
      showItem(productsTemp[i]);
    }
  }
});


////////////////////////////////////////////////////////////////////////////////
//       DOM APPENDING FUNCTIONS       /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Display search results
function findItem(item) {
  $('#product').empty();
  $('#results').empty();
  $('#carousel-ads').hide();
  $('#view-cart').find('.cart-items').empty();
  $('#view-cart').find('.cart-head').addClass('hide');
  $('#view-cart').find('.empty-cart').hide();
  for (var i = 0; i < productsTemp.length; i++) {
    for (var j = 0; j < productsTemp[i].keywords.length; j++) {
      if (productsTemp[i].keywords[j] === item.toLowerCase()) {
        var resultCol = $('<div class="col-xs-3 col-sm-3 col-md-3 product-col"></div>');
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

//Display product detail
function showItem(object) {
  $('#results').empty();
  $('#view-cart').find('.cart-items').empty();
  $('#view-cart').find('.cart-head').addClass('hide');
  $('#view-cart').find('.empty-cart').hide();
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
  var prodAddRemoveLink = $('<a href="#"></a>')
  var prodAddRemoveList = $('<p class="add-remove-link">Add to list</p>');
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
  $(prodAddCol).append(prodAddRemoveLink);
  $(prodAddRemoveLink).append(prodAddRemoveList);
  for (var i = 0; i < saveForLater.length; i++) {
    if (object === saveForLater[i]) {
      $('#product').find('.add-remove-link').text("Remove from list");
    }
  }
  if (object.description.length === 1) {
    displayHelper(object.description, prodMediaBody, 'prodMediaAboutP', 'p');
  } else {
    displayHelper(object.description, prodMediaAboutUL, 'prodMediaAboutLi', 'li');
    $(prodMediaBody).append(prodMediaAboutUL);
  }
  displayHelper(object.stock, prodQty, 'prodQtyOption', 'option', 1);
}

//Display cart contents
function showCart() {
  $('#results').empty();
  $('#product').empty();
  $('#view-cart').find('.cart-items').empty();
  $('#view-cart').find('.hide').removeClass('hide');
  $('#view-cart').find('.empty-cart').hide();
  var subtotal = 0;
  if (cartContents.length === 0) {
    var noItems = $('<h2 class="empty-cart">Add something to your shopping cart</h2>');
    $('#view-cart').append(noItems);
  } else {
    $('#view-cart').find('.empty-cart').addClass('hide');
    for (var i = 0; i < cartContents.length; i++) {
      var link = $('<a href="#"></a>');
      var cartItems = $('<div class="cart-items"></div>');
      var cartMediaRow = $('<div class="row"></div>');
      var cartMediaCol = $('<div class="col-xs-7 col-sm-7 col-md-6"></div>');
      var cartMediaList = $('<ul class="media-list"></ul>');
      var cartMedia = $('<li class="media"></li>');
      var cartMediaLeft = $('<div class="media-left"></div>');
      var cartMediaImgLink = $('<a href="#"></a>');
      var cartMediaImg = $('<img class="media-object cart-img" src="' + cartContents[i][0].image + '">');
      var cartMediaBody = $('<div class="media-body"></div>');
      var cartMediaHeadingLink = $('<a href="#"></a>');
      var cartMediaHeading = $('<h4 class="media-heading inline">' + cartContents[i][0].name + '</h4>');
      var cartMediaBy = $('<p class="cart-pad inline">By ' + cartContents[i][0].by + '</p>');
      var cartOptions = $('<div class="cart-options"></div>');
      var cartOptionsDelLink = $('<a href="#"></a>');
      var cartOptionsDel = $('<p class="inline">Delete</p>');
      var cartOptionsSpacer = $('<p class="cart-pad inline">|</p>');
      var cartOptionsSaveLink = $('<a href="#"></a>');
      var cartOptionsSave = $('<p class="cart-pad inline">Save for later</p>');
      var cartPriceCol = $('<div class="col-xs-1 col-sm-1 col-md-2"></div>');
      var cartPrice = $('<h5 class="media-heading">' + cartContents[i][0].price + '</h5>');
      var cartQtyCol = $('<div class="col-xs-2 col-sm-2 col-md-2"></div>');
      var cartQtyForm = $('<div class="form-group cart-qty pull-right"></div>');
      var cartQty = $('<select class="form-control qty"></select');
      displayHelper(cartContents[i][0].stock, cartQty, 'cartQtyOption', 'option', cartContents[i][1]);
      var cartMediaEndRow = $('<div class="row"></div>');
      var cartMediaEndCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
      var cartMediaEndHr = $('<hr class="cart-hr">');
      $('#view-cart').append(cartItems);
      $(cartItems).append(cartMediaRow);
      $(cartMediaRow).append(cartMediaCol);
      $(cartMediaCol).append(cartMediaList);
      $(cartMediaList).append(cartMedia);
      $(cartMedia).append(cartMediaLeft);
      $(cartMediaLeft).append(cartMediaImgLink);
      $(cartMediaImgLink).append(cartMediaImg);
      $(cartMedia).append(cartMediaBody);
      $(cartMediaBody).append(cartMediaHeadingLink);
      $(cartMediaHeadingLink).append(cartMediaHeading);
      $(cartMediaBody).append(cartMediaBy);
      $(cartMediaBody).append(cartOptions);
      $(cartOptions).append(cartOptionsDelLink);
      $(cartOptionsDelLink).append(cartOptionsDel);
      $(cartOptions).append(cartOptionsSpacer);
      $(cartOptions).append(cartOptionsSaveLink);
      $(cartOptionsSaveLink).append(cartOptionsSave);
      $(cartMediaRow).append(cartPriceCol);
      $(cartPriceCol).append(cartPrice);
      $(cartMediaRow).append(cartQtyCol);
      $(cartQtyCol).append(cartQtyForm);
      $(cartQtyForm).append(cartQty);
      $(cartItems).append(cartMediaEndRow);
      $(cartMediaEndRow).append(cartMediaEndCol);
      $(cartMediaEndCol).append(cartMediaEndHr);
      subtotal += cartContents[i][0].price * cartContents[i][1];
    }
  }
  var cartSubtotalRow = $('<div class="row"></div>');
  var cartSubtotalCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
  var cartSubtotalCount = $('<h4 class="pull-right inline subtotal-footer">Subtotal ' + subTotalPreview() + '</h4>');
  var cartSubtotalPrice = $('<h4 class="pull-right subtotal-footer cart-price inline">' + '$' + calcSubtotal(cartContents).toFixed(2) + '</h4>');
  $(cartItems).append(cartSubtotalRow);
  $(cartSubtotalRow).append(cartSubtotalCol);
  $(cartSubtotalCol).append(cartSubtotalPrice);
  $(cartSubtotalCol).append(cartSubtotalCount);
}


////////////////////////////////////////////////////////////////////////////////
//       UTILITY FUNCTIONS       ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//Appending Item Description
function displayHelper(data, parent, child, el, value) {
  if (typeof data === 'object') {
    var child = [];
    for (var i = 0; i < data.length; i++) {
      child[i] = $('<' + el + '>' + data[i] + '</' + el + '>');
      $(parent).append(child[i]);
    }
  } else if (typeof data === 'number') {
    for (var i = 1; i < data + 1; i++) {
      if (i !== value) {
        child = $('<' + el + '>' + i + '</' + el + '>');
        $(parent).append(child);
      } else {
        child = $('<' + el + ' selected="selected">' + i + '</' + el + '>');
        $(parent).append(child);
      }
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

//Cart SubTotal Preview
function subTotalPreview() {
  var numItems = 0;
  var subTotalMsg;
  for (var i = 0; i < cartContents.length; i++) {
    numItems += cartContents[i][1];
  }
  if (numItems > 1) {
    subTotalMsg = '(' + numItems + ' items): ';
    return subTotalMsg;
  } else {
    subTotalMsg = '(' + numItems + ' item): ';
    return subTotalMsg;
  }
}

//Cart Quantity
function cartQuantity(array, item, value) {
  var quantity = value;
  if (array.length > 0) {
    for (var j = 0; j < array.length; j++) {
      if (array[j][0] === item) {
        array[j][1] += quantity;
        return quantity;
      }
    }
    array.push([item, quantity]);
    return quantity;
  } else {
    array.push([item, quantity]);
    return quantity;
  }
}

//Cart Subtotal
function calcSubtotal(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i][0].price * arr[i][1]
  }
  return sum;
}

//Cart count
function cartCount() {
  var count = 0;
  for (var x = 0; x < cartContents.length; x ++) {
    count += cartContents[x][1];
  }
  return count;
}
