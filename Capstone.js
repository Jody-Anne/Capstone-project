let count = 0;
const itemsInCart = [];

// Pottery items store
const potteryItems = [{
  image: "./Pictures/alvin-engler-bIhpiQA009k-unsplash.jpg",
  name: "Alvin Engler Vase",
  description: "Dark grey vase",
  price: "75"
}, {
  image: "./Pictures/andrew-petrov-rqkJBfCzprw-unsplash.jpg",
  name: "Andrew Petrov Vase",
  description: "Bottle fashioned Vase",
  price: "60"
}, {
  image: "./Pictures/anh-lam-ogqEE42qdK0-unsplash.jpg",
  name: "Anh Lam Vase",
  description: "White classic Vase",
  price: "89"
}, {
  image: "./Pictures/oshin-khandelwal-EQpXnijYejQ-unsplash.jpg",
  name: "Oshin Khandelwal set",
  description: "Bottle fashioned Vase",
  price: "79"
}, {
  image: "./Pictures/sidney-pearce-rco9Z8raWFM-unsplash.jpg",
  name: "Sidney Pearce Bowls",
  description: "Colorful ornimental bowls",
  price: "80"
}, {
  image: "./Pictures/toa-heftiba-yN33yGmulWE-unsplash.jpg",
  name: "Toa Heftiba set",
  description: "Green and light brown set",
  price: "150"
}, {
  image: "./Pictures/tom-crew-3uwu5K0RtaE-unsplash.jpg",
  name: "Tom Crew Jars",
  description: "Vintage grey ornimental jars",
  price: "50"
}, {
  image: "./Pictures/vladimir-gladkov-NPPIq1XFdck-unsplash.jpg",
  name: "Vladimir Gladkov Set",
  description: "Speckled light brown and white set",
  price: "100"
}, {
  image: "./Pictures/suzanne-boureau-vG9Y8YvzdSQ-unsplash.jpg",
  name: "Suzanne Boureau Set",
  description: "Blue and beige cup and milk jug set",
  price: "135"
}, {
  image: "./Pictures/oriento-6HYqdm0CniQ-unsplash.jpg",
  name: "Oriento Vase",
  description: "Blue and black marbled vase",
  price: "96"
}]

//if add to cart btn clicked
$(document).ready(function () {
  const getCartItemIds = () => {
    const storedItemsString = localStorage.getItem("itemsInCart")
    if (storedItemsString) {
      return JSON.parse(storedItemsString);
    }
    return [];
  }

  let count = getCartItemIds().length;

  const getCartItems = () => {
    const storedItemsString = localStorage.getItem("itemsInCart");
    if (storedItemsString) {
      return JSON.parse(storedItemsString).map((cartItem) => potteryItems[cartItem]);
    }
    return []
  }

  const getTotalCost = () => {
    return getCartItems().reduce((sum, item) => sum + Number(item.price), 0);
  }

  const populateCatalog = () => {
    potteryItems.forEach((item, idx) => {
      const card = `<div class="card">
              <img src="${item.image}" alt="">
                <div class="content">
                  <div class="row">
                    <div class="details">
                      <span>TEST ${item.name}</span>
                      <p>${item.description}</p>
                    </div>
                    <div class="price">R${item.price}</div>
                  </div>
                  <div class="buttons">
                    <button class="cart-btn" data-id="${idx}">Add to Cart</button>
                  </div>
                </div>
            </div>`;
      $("#catalog").append(card);
    })
  }

  // Add the items for sale to the page for displaying
  populateCatalog();

  $('.cart-btn').on('click', function () {
    let cart = $('.cart-nav');
    // find the img of that card which button is clicked by user
    let imgtodrag = $(this).parent('.buttons').parent('.content').parent('.card').find("img").eq(0);
    if (imgtodrag) {
      // duplicate the img
      var imgclone = imgtodrag.clone().offset({
        top: imgtodrag.offset().top,
        left: imgtodrag.offset().left
      })
        .css({
          'opacity': '0.8',
          'position': 'absolute',
          'height': '150px',
          'width': '150px',
          'z-index': '100'
        })
        .appendTo($('body')).animate({
          'top': cart.offset().top + 20,
          'left': cart.offset().left + 30,
          'width': 75,
          'height': 75
        }, 1000, 'easeInOutExpo');

      setTimeout(function () {
        count++;
        $(".cart-nav .item-numb").text(count);
      }, 500);

      const itemsInCart = getCartItemIds();
      const itemId = $(this).attr("data-id");
      itemsInCart.push(itemId);
      localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));

      alert(`Total Cost: R${getTotalCost()}`)


      imgclone.animate({
        'width': 0,
        'height': 0
      }, function () {
        $(this).detach()
      });
    }
  });

  /* Promo Code onClick function on Checkout Page */
  $("#promo-code").click(function() {
      document.getElementById("promo-code").style.display = "none";
      document.getElementById("promo-box").style.display = "block";
  });
});