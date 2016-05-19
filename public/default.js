var productsTemp = [
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    image: "http://ecx.images-amazon.com/images/I/51zFTdNilAL._SX377_BO1,204,203,200_.jpg",
    price: 21.57,
    keywords: ["book", "javascript"]
  }
]

$(document).ready(function() {
  $("#search-btn").click(function(event) {
    event.preventDefault();
    if (findItem($("#search-txt").val())) {
      console.log(true);
    } else {
      console.log(false);
    }
  });
});

function findItem(item) {
  for (var i = 0; i < productsTemp.length; i++) {
    for (var j = 0; j < productsTemp[i].keywords.length; j++) {
      if (productsTemp[i].keywords[j] === item.toLowerCase()) {
        var productCol = $('<div class="col-md-3"></div>');
        var productThumb = $('<div class="thumbnail"></div>');
        var productImg = $('<img src="' + productsTemp[i].image + '">')
        var productTitleDiv = $('<div class="product-title">')
        var productTitle = $('<a href="#"><h5>' + productsTemp[i].name + '</h5></a>')
        var productPrice = $('<p class="product-price">$' + productsTemp[i].price + '</p>')
        $('#results').append(productCol);
        $(productCol).append(productThumb);
        $(productThumb).append(productImg);
        $(productThumb).append(productTitleDiv);
        $(productTitleDiv).append(productTitle);
        $(productTitleDiv).append(productPrice);
      }
    }
  }
}
