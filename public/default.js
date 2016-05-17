var productsTemp = [
  {
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    image: "http://ecx.images-amazon.com/images/I/51zFTdNilAL._SX377_BO1,204,203,200_.jpg",
    price: 21.57,
    keywords: ["book", "javascript"]
  }
]

$("#search-btn").click(function(event) {
  event.preventDefault();
  if (findItem($("#search-txt").val())) {
    console.log(true);
  } else {
    console.log(false);
  }
});

function findItem(item) {
  for (var i = 0; i < productsTemp.length; i++) {
    for (var j = 0; j < productsTemp[i].keywords.length; j++) {
      if (productsTemp[i].keywords[j] === item) {
        return true;
      }
    }
  }
  return false;
}
