var cartContents = [];
var saveForLater = [];
var orderHistory = [];
var recommended = [productsTemp[0], productsTemp[1], productsTemp[2], productsTemp[3]];
var viewed = [];
var spotlight = [productsTemp[9]];

////////////////////////////////////////////////////////////////////////////////
// EVENTS
////////////////////////////////////////////////////////////////////////////////

//Product navigation on click event
$('#landing, #results, #product').on('click', 'a', function() {
  var productImg = $(this).closest('div').find('img').attr('src'),
      productTxt = $(this).find('.media-heading').text();
  for (var i = 0; i < productsTemp.length; i++) {
    if (productImg === productsTemp[i].image[0] || productTxt === productsTemp[i].name) {
      showItem(productsTemp[i]);
      //Check if product is in 'viewed' array and delete/insert it
      var index = viewed.indexOf(productsTemp[i]);
      if (index !== -1) {
        viewed.splice(index, 1);
      }
      viewed.splice(0, 0, productsTemp[i]);
    }
  }
});

//Fade in top landing div based on scroll position
$(window).on('scroll', function() {
  var scrollTop = $(window).scrollTop();
  $('.wrapper-top').css({ 'opacity': (scrollTop / 500) });
  $('.scroll-down').css({ 'opacity': ((200 - scrollTop) / 200) });
});

//Fade in categories based on scroll position
$(window).on('scroll', function() {
  if ($(window).scrollTop() > 1200) {
    $('#landing').find('#icon-tv').closest('div').animate({ top: '230' }, 300, 'easeOutCubic', function() {
      $('#landing').find('#icon-book').closest('div').animate({ top: '230' }, 300, 'easeOutCubic', function() {
        $('#landing').find('#icon-iphone').closest('div').animate({ top: '230' }, 300, 'easeOutCubic', function() {
          $('#landing').find('.icons-text').closest('div').animate({ top: '-430' }, 1500, 'easeOutCubic');
        });
      });
    });
  }
});

//Fade in spotlight product based on scroll position
$(window).on('scroll', function() {
  var deal = $('#landing').find('.landing-spotlight');
  if ($(window).scrollTop() > 1500) {
    deal.slideDown(1000);
  } else {
    deal.slideUp(1000);
  }
});

//Navigate products via category
$('.wrapper-mid').on('click', 'a', function() {
  var icon = $(this).find('img').attr('src');
  if (icon === 'images/black-white-metro-tv-icon.png') {
    findItem('tv');
  } else if (icon === 'images/black-white-metro-book-icon.png') {
    findItem('book');
  } else {
    findItem('iphone');
  }
});

//Hover effect on categories
$('.wrapper-mid').on('mouseenter', 'a', function() {
  $(this).find('img').toggleClass('icon-rollover');
});
$('.wrapper-mid').on('mouseleave', 'a', function() {
  $(this).find('img').toggleClass('icon-rollover');
});

//Hover effect on products
$('#landing, #results, #product').on('mouseenter', '.thumbnail', function() {
  $(this).find('img').stop().animate({ 'margin-top': '-5px' }, 300);
});
$('#landing, #results, #product').on('mouseleave', '.thumbnail', function() {
  $(this).find('img').stop().animate({ 'margin-top': '0px' }, 300);
});

//Search for products
$('#search-btn').on('click', function(event) {
  event.preventDefault();
  findItem($('#search-txt').val());
});

//Toggle alternate product images by hover
$('#product').on('mouseenter', '.alt-img', function() {
  var imgAlt = $(this).find('img').attr('src');
  $(this).closest('.media-left').find('.product-img').attr('src', imgAlt);
  $(this).css({'border': 'solid 2px #f2da4b'});
});

$('#product').on('mouseleave', '.alt-img', function() {
  $(this).css({'border': 'solid 1px #e7e5e5'});
});

//Navigate home
$('#logo').on('click', function() {
  clearAll('home');
  if (viewed.length > 0) {
    $('#landing').find('h2').addClass('hide');
    if (viewed.length === 5) {
      viewed.pop();
    }
  }
  // Append 'viewed' products
  for (var i = 0; i < viewed.length; i++) {
    var viewedCol = $('<div class="col-xs-3 col-sm-3 col-md-3"></div>');
    var viewedThumb = $('<a  class="thumbnail" href="#"></a>');
    var viewedImg = $('<img class="landing-image" src="' + viewed[i].image[0] + '">');
    $('#landing').find('.viewed').append(viewedCol);
    $(viewedCol).append(viewedThumb);
    $(viewedThumb).append(viewedImg);
  }
});

//Add product to cart with modal prompt
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

//Add/Remove from list
$('#product').on('click', '.add-remove-link', function() {
  var click = $(this).text();
  var selectItem = $(this).closest('#product').find('.media-heading').text();
  for (var i = 0; i < productsTemp.length; i++) {
    if (productsTemp[i].name === selectItem) {
      switch (click) {
        case "Add to list":
          saveForLater.push(productsTemp[i]);
          showItem(productsTemp[i]);
          break;
        case "Remove from list":
          saveForLater.splice(productsTemp[i], 1);
          showItem(productsTemp[i]);
          break;
      }
    }
  }
});

//Change cart quantity
$('#view-cart').on('change', '.cart-qty', function() {
  var itemToChange = $(this).closest('.item-row').find('.media-heading').first().text();
  var changeQty = parseInt($(this).find('.qty').val());
  for (var i = 0; i < cartContents.length; i++) {
    if (cartContents[i][0].name === itemToChange) {
      cartContents[i][1] = changeQty;
    }
  }
  showCart();
  $('#cart-count').text(cartCount());
});

//Cart additiional options
$('#view-cart').on('click', 'a', function(e) {
  e.preventDefault();
  var click = $(this).text();
  var product = $(this).closest('.media-body').find('.media-heading').text();
  if (click !== 'Delete' && click !== 'Save for later') {
    for (var i = 0; i < productsTemp.length; i++) {
      if (product === productsTemp[i].name) {
        showItem(productsTemp[i]);
      }
    }
  } else {
    for (var i = 0; i < cartContents.length; i++) {
      if (cartContents[i][0].name === product) {
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
  }
});

//Proceed to cart via modal button
$('#cartAddModal').on('click', '.btn-primary', function() {
  showCart();
});

//Proceed to cart via cart button
$('#cart').on('click', function() {
  showCart();
});

//Display saved items/order history popovers
$('.navbar').on('click', 'a', function(e) {
  e.preventDefault();
  if ($(this).text() === "Saved For Later") {
    $('#my-list').popover({
      html: 'true',
      delay: {
       show: '500'
      },
      content : function() {
        var content = $('<div></div>');
        if (saveForLater.length === 0) {
          $(content).append('<p class="empty-list">No Saved Items</p>');
        } else {
          for (var i = 0; i < saveForLater.length; i++) {
            var savedMedia = $('<div class="media"></div>');
            var savedMediaLeft = $('<div class="media-left"></div>');
            var savedMediaImgLink = $('<a href="#" data-list="item"></a>');
            var savedMediaObject = $('<img class="media-object cart-added-img" src="' + saveForLater[i].image + '">');
            var savedMediaBody = $('<div class="media-body"></div>');
            var savedMediaLink = $('<a href="#" data-list="item"></a>');
            var savedMediaHeading = $('<div class="media-heading">' + truncate(saveForLater[i].name, 40) + '</div>');
            var savedDelete = $('<a class="btn btn-danger btn-xs list-remove pull-right" data-list="delete">Remove</a>');
            var savedCart = $('<a class="btn btn-default btn-xs list-remove pull-right" data-list="cart">Add to Cart</a>');
            $(content).append(savedMedia);
            $(savedMedia).append(savedMediaLeft);
            $(savedMediaLeft).append(savedMediaImgLink);
            $(savedMediaImgLink).append(savedMediaObject);
            $(savedMedia).append(savedMediaBody);
            $(savedMediaBody).append(savedMediaLink);
            $(savedMediaLink).append(savedMediaHeading);
            $(savedMediaBody).append(savedCart);
            $(savedMediaBody).append(savedDelete);
            if (i !== saveForLater.length - 1) {
              $(content).append('<hr>');
            }
          }
        }
        return content;
      }
    });
    $('#my-list').popover('show');
  } else if ($(this).text() === "Order History") {
    $('#my-orders').popover({
      html: 'true',
      delay: {
       show: '500'
      },
      content : function() {
        var content = $('<div></div>');
        if (orderHistory.length === 0) {
          $(content).append('<p class="empty-list">No orders placed</p>');
        }
        return content;
      }
    });
    $('#my-orders').popover('show');
  }
});

//Saved items popover navigation
$(document).on('click', 'a', function() {
  var listDelegation = $(this).data('list');
  for (var i = 0; i < productsTemp.length; i++) {
    if ($(this).closest('.media').find('.media-heading').text() === truncate(productsTemp[i].name, 40)) {
      var product = productsTemp[i];
      var index = saveForLater.indexOf(product);
      var productPage = $('#product').find('.media-heading').text();
      if (listDelegation === 'delete') {
        saveForLater.splice(index, 1);
        //Updates page if viewing target product in saved list
        if (typeof productPage !== 'undefined' && productPage === product.name) {
          showItem(product);
        }
      } else if (listDelegation === 'cart') {
        //Add product to cart. If already in cart, update quantity
        cartQuantity(cartContents, product, 1);
        $('#cart-count').text(cartCount());
        saveForLater.splice(index, 1);
        showCart();
      } else if (listDelegation === 'item') {
        showItem(product);
      }
    }
  }
});

////////////////////////////////////////////////////////////////////////////////
//DOM APPENDING
////////////////////////////////////////////////////////////////////////////////

//'Recommended' section on landing
for (var i = 0; i < recommended.length; i++) {
  var recommendedCol = $('<div class="col-xs-3 col-sm-3 col-md-3"></div>');
  var recommendedThumb = $('<a  class="thumbnail" href="#"></a>');
  var recommendedImg = $('<img class="landing-image" src="' + recommended[i].image[0] + '">');
  $('#landing').find('.recommendations').append(recommendedCol);
  $(recommendedCol).append(recommendedThumb);
  $(recommendedThumb).append(recommendedImg);
  //Append horizontal rule after last recommended product
  if (i === recommended.length - 1) {
    var recommendedHRCol = $('<div class="col-md-12"></div>');
    $('#landing').find('.recommendations').append(recommendedHRCol);
    $(recommendedHRCol).append('<hr>');
  }
}

//'Spotlight' section on landing
var spotlightMediaCol = $('<div class="col-xs-12 col-sm-12 col-md-12"></div>');
var spotlightMedia = $('<div class="media"></div>');
var spotlightMediaLeft = $('<div class="media-left"></div>');
var spotlightMediaImgLink = $('<a class="spotlight-link" href="#"></a>');
var spotlightImgWrapper = $('<div class="product-img-wrapper"></div>');
var spotlightImg = $('<img class="product-img" src="' + spotlight[0].image[0] + '">');
var spotlightMediaBody = $('<div class="media-body"></div>');
var spotlightMediaHeadingLink = $('<a class="spotlight-link" href="#"></a>');
var spotlightMediaHeading = $('<h3 class="media-heading">' + spotlight[0].name + '</h3>');
var spotlightMediaPrice = $('<p>Price: <span class="media-price">$' + spotlight[0].price + '</span></p>');
var spotlightMediaAboutUL = $('<ul class="media-ul"></ul>');
$('#landing').find('.spacer').append(spotlightMediaCol);
$(spotlightMediaCol).append(spotlightMedia);
$(spotlightMedia).append(spotlightMediaLeft);
$(spotlightMediaLeft).append(spotlightMediaImgLink);
$(spotlightMediaImgLink).append(spotlightImgWrapper);
$(spotlightImgWrapper).append(spotlightImg);
$(spotlightMedia).append(spotlightMediaBody);
$(spotlightMediaBody).append(spotlightMediaHeadingLink);
$(spotlightMediaHeadingLink).append(spotlightMediaHeading);
$(spotlightMediaBody).append(spotlightMediaPrice);
if (spotlight[0].description.length === 1) {
  displayHelper(spotlight[0].description, spotlightMediaBody, 'spotlightMediaAboutP', 'p');
} else {
  displayHelper(spotlight[0].description, spotlightMediaAboutUL, 'spotlightMediaAboutLi', 'li');
  $(spotlightMediaBody).append(spotlightMediaAboutUL);
}

//Append results
function findItem(item) {
  clearAll('search');
  var hits = 0;
  for (var i = 0; i < productsTemp.length; i++) {
    for (var j = 0; j < productsTemp[i].tags.length; j++) {
      if (productsTemp[i].tags[j] === item.toLowerCase()) {
        var resultCol = $('<div class="col-xs-3 col-sm-3 col-md-3"></div>');
        var resultThumb = $('<a  class="thumbnail" href="#"></a>');
        var resultImg = $('<img src="' + productsTemp[i].image[0] + '">');
        var resultTitleDiv = $('<div>');
        var resultTitle = $('<h5 class="product-title">' + productsTemp[i].name + '</h5>');
        var resultPrice = $('<p class="product-price">$' + productsTemp[i].price + '</p>');
        $('#results').find('.row').append(resultCol);
        $(resultCol).append(resultThumb);
        $(resultThumb).append(resultImg);
        $(resultThumb).append(resultTitleDiv);
        $(resultTitleDiv).append(resultTitle);
        $(resultTitleDiv).append(resultPrice);
        hits++;
      }
    }
  }
  //If search returns zero results, show available categories
  if (hits === 0) {
    clearAll('home');
    window.scroll(0, 1400), setTimeout(function() {
      $('#landing').find('.icons-text').animate({ 'font-size': '80px' }, 1000), setTimeout(function() {
        $('#landing').find('.icons-text').animate({ 'font-size': '60px' }, 1000);
      }, 1000);
    }, 120);
  }
}

//Append product detail
function showItem(item) {
  clearAll('product');
  var prodRow = $('#product').find('.row');
  var prodMediaCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
  var prodMedia = $('<div class="media"></div>');
  var prodMediaLeft = $('<div class="media-left"></div>');
  var prodImgWrapper = $('<div class="product-img-wrapper"></div>');
  var prodMediaImg = $('<img class="product-img" src="' + item.image[0] + '">');
  var prodAltImgWrapper = $('<div class="alt-img-wrapper"></div>');
  var prodMediaBody = $('<div class="media-body"></div>');
  var prodMediaHeading = $('<h3 class="media-heading">' + item.name + '</h3>');
  var prodHR = $('<hr>');
  var prodMediaPrice = $('<p>Price: <span class="media-price">$' + item.price + '</span></p>');
  var prodMediaAboutUL = $('<ul class="media-ul"></ul>');
  var prodAddCol = $('<div class="col-xs-2 col-sm-2 col-md-2 add-col text-center"></div>');
  var prodQtyForm = $('<form class="form-inline"></form>');
  var prodQtyGroup = $('<div class="form-group quantity"></div>');
  var prodQtyText = $('<div class="form-control-static">Qty:</div>');
  var prodQty = $('<select class="form-control qty"></select');
  var prodAdd = $('<button class="btn btn-warning add-to-cart">Add to Cart</button>');
  var prodAddRemoveLink = $('<a href="#"></a>')
  var prodAddRemoveList = $('<p class="add-remove-link">Add to list</p>');
  var prodSimilarHRCol = $('<div class="col-xs-12 col-sm-12 col-md-12 spacer"></div>');
  var prodSimilarHR = $('<hr>');
  var prodSimilarCol = $('<div class="col-xs-12 col-sm-12 col-md-12"></div>');
  var prodSimilarHeader = $('<p class="section-header">Similar Products</p>');
  prodRow.append(prodMediaCol);
  $(prodMediaCol).append(prodMedia);
  $(prodMedia).append(prodMediaLeft);
  $(prodMediaLeft).append(prodImgWrapper);
  $(prodImgWrapper).append(prodMediaImg);
  $(prodMediaLeft).append(prodAltImgWrapper);
  $(prodMedia).append(prodMediaBody);
  $(prodMediaBody).append(prodMediaHeading);
  $(prodMediaBody).append(prodHR);
  $(prodMediaBody).append(prodMediaPrice);
  prodRow.append(prodAddCol);
  $(prodAddCol).append(prodQtyForm);
  $(prodQtyForm).append(prodQtyGroup);
  $(prodQtyGroup).append(prodQtyText);
  $(prodQtyGroup).append(prodQty);
  $(prodAddCol).append(prodAdd);
  $(prodAddCol).append(prodAddRemoveLink);
  $(prodAddRemoveLink).append(prodAddRemoveList);
  prodRow.append(prodSimilarHRCol);
  $(prodSimilarHRCol).append(prodSimilarHR);
  prodRow.append(prodSimilarCol);
  $(prodSimilarCol).append(prodSimilarHeader);
  var similar = findRelated(item);
  appendSection(similar, prodRow);
  // recommendedItems(recommended, prodRow);
  for (var i = 0; i < saveForLater.length; i++) {
    if (item === saveForLater[i]) {
      $('#product').find('.add-remove-link').text("Remove from list");
    }
  }
  if (item.description.length === 1) {
    displayHelper(item.description, prodMediaBody, 'prodMediaAboutP', 'p');
  } else {
    displayHelper(item.description, prodMediaAboutUL, 'prodMediaAboutLi', 'li');
    $(prodMediaBody).append(prodMediaAboutUL);
  }
  displayHelper(item.stock, prodQty, 'prodQtyOption', 'option', 1);
  for (var x = 0; x < item.image.length; x++) {
    var prodAltImgHolder = $('<div class="alt-img"></div>');
    var prodAltImg = $('<img src="' + item.image[x] + '">');
    $(prodAltImgWrapper).append(prodAltImgHolder);
    $(prodAltImgHolder).append(prodAltImg);
  }
}

//Append cart contents
function showCart() {
  clearAll('cart');
  var subtotal = 0;
  //Shopping cart headers
  var cartHeadNameCol = $('<div class="col-xs-7 col-sm-7 col-md-6"></div>');
  var cartHeadName = $('<h3 class="cart-title-main">Shopping Cart</h3>');
  var cartHeadPriceCol = $('<div class="col-xs-1 col-sm-1 col-md-2">');
  var cartHeadPrice = $('<p class="cart-title">Price</p>');
  var cartHeadQtyCol = $('<div class="col-xs-2 col-sm-2 col-md-2">');
  var cartHeadQty = $('<p class="pull-right cart-title">Quantity</p>');
  var cartHeadHrCol = $('<div class="col-xs-10 col-sm-10 col-md-10">');
  var cartHeadHr = $('<hr class="cart-hr">');
  $('#view-cart').find('.row').append(cartHeadNameCol);
  $(cartHeadNameCol).append(cartHeadName);
  $('#view-cart').find('.row').append(cartHeadPriceCol);
  $(cartHeadPriceCol).append(cartHeadPrice);
  $('#view-cart').find('.row').append(cartHeadQtyCol);
  $(cartHeadQtyCol).append(cartHeadQty);
  $('#view-cart').find('.row').append(cartHeadHrCol);
  $(cartHeadHrCol).append(cartHeadHr);
  //If cart empty, append message
  if (cartContents.length === 0) {
    var noItemsCol = $('<div class="col-md-12"></div>');
    var noItems = $('<h2 class="no-items">Add something to your shopping cart</h2>');
    var noItemsHrCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
    var noItemsHr = $('<hr class="cart-hr">');
    $('#view-cart').find('.row').append(noItemsCol);
    $(noItemsCol).append(noItems);
    $('#view-cart').find('.row').append(noItemsHrCol);
    $(noItemsHrCol).append(noItemsHr);
  //If items, loop and append
  } else {
    for (var i = 0; i < cartContents.length; i++) {
      var cartMediaParent = $('<div class="item-row"></div>');
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
      var cartPrice = $('<h5 class="media-heading">$' + cartContents[i][0].price + '</h5>');
      var cartQtyCol = $('<div class="col-xs-2 col-sm-2 col-md-2"></div>');
      var cartQtyForm = $('<div class="form-group cart-qty pull-right"></div>');
      var cartQty = $('<select class="form-control qty"></select');
      displayHelper(cartContents[i][0].stock, cartQty, 'cartQtyOption', 'option', cartContents[i][1]);
      var cartMediaEndCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
      var cartMediaEndHr = $('<hr class="cart-hr">');
      $('#view-cart').find('.row').append(cartMediaParent);
      $(cartMediaParent).append(cartMediaCol);
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
      $(cartMediaParent).append(cartPriceCol);
      $(cartPriceCol).append(cartPrice);
      $(cartMediaParent).append(cartQtyCol);
      $(cartQtyCol).append(cartQtyForm);
      $(cartQtyForm).append(cartQty);
      $(cartMediaParent).append(cartMediaEndCol);
      $(cartMediaEndCol).append(cartMediaEndHr);
      subtotal += cartContents[i][0].price * cartContents[i][1];
    }
  }
  //Append cart subtotal
  var cartSubtotalRow = $('<div class="row"></div>');
  var cartSubtotalCol = $('<div class="col-xs-10 col-sm-10 col-md-10"></div>');
  var cartSubtotalCount = $('<h4 class="pull-right inline subtotal-footer">Subtotal ' + subTotalPreview() + '</h4>');
  var cartSubtotalPrice = $('<h4 class="pull-right subtotal-footer cart-price inline">' + '$' + calcSubtotal(cartContents).toFixed(2) + '</h4>');
  $('#view-cart').find('.row').append(cartSubtotalRow);
  $(cartSubtotalRow).append(cartSubtotalCol);
  $(cartSubtotalCol).append(cartSubtotalPrice);
  $(cartSubtotalCol).append(cartSubtotalCount);
}

////////////////////////////////////////////////////////////////////////////////
//UTILITY FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function appendSection(array, parent) {
  for (var i = 0, x = 4; i < x; i++) {
    var column = $('<div class="col-xs-3 col-sm-3 col-md-3"></div>');
    var thumb = $('<a  class="thumbnail" href="#"></a>');
    var image = $('<img class="landing-image" src="' + array[i].image[0] + '">');
    parent.append(column);
    $(column).append(thumb);
    $(thumb).append(image);
    //Append horizontal rule after last item
    if (i === 3) {
      var columnHR = $('<div class="col-md-12"></div>');
      parent.append(columnHR);
      $(columnHR).append('<hr>');
    }
  }
}

function findRelated(item) {
  var category = item.tags[0],
      related = [];
  for (var i = 0, x = productsTemp.length; i < x; i++) {
    if (productsTemp[i].tags.indexOf(category) !== -1 && related.indexOf(productsTemp[i]) === -1 && item !== productsTemp[i]) {
      related.push(productsTemp[i]);
    }
  }
  return related;
}

//Appending Item Description
function displayHelper(data, parent, child, el, value) {
  if (typeof data === 'object') {
    var child = [],
        x = data.length;

    for (var i = 0; i < x; i++) {
      child[i] = $('<' + el + '>' + data[i] + '</' + el + '>');
      $(parent).append(child[i]);
    }
  } else if (typeof data === 'number') {
    var child = [],
        x = data + 1;
    for (var i = 1; i < x; i++) {
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
function calcSubtotal(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i][0].price * array[i][1]
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

//Clear page
function clearAll(destination) {
  $('#results').find('.row').empty();
  $('#product').find('.row').empty();
  $('#view-cart').find('.row').empty();
  $(window).scrollTop(0);
  if (destination !== 'home'){
    $('#landing').addClass('hide');
    $('footer').addClass('hide');
    $('#cover-up').removeClass('hide');
  } else {
    $('#landing').removeClass('hide');
    $('footer').removeClass('hide');
    $('#cover-up').addClass('hide');
    $('#landing').find('.viewed').empty();
  }
}
//
// function findSimilar(item) {
//   recommended = [];
//   var category = item.tags[0];
//   for (var i = 0, x = productsTemp.length; i < x; i++) {
//     // for (var j = 0, y = productsTemp[i].tags.length; j < y; j++) {
//       if (productsTemp[i].tags.indexOf(category) !== -1 && recommended.indexOf(productsTemp[i]) === -1 && item !== productsTemp[i]) {
//         recommended.push(productsTemp[i]);
//       }
//     // }
//   }
//   while (recommended.length > 4) {
//     recommended.pop();
//   }
// }
