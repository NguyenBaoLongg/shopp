const productsContainer = document.querySelector(".list-products-in-cart");
class ShoppingCart {
    constructor() {
        this.items = [];
        this.cnt = 0;
    }
    addItem(id, products) {
        const product = products.find((item) => item.id === id);
        const { src, title, price } = product;
        this.items.push(product);
        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] =
                (totalCountPerProduct[id] || 0) + 1;
        });
        if (totalCountPerProduct[id] === 1) {
            this.cnt++;
        }
        const currentProductCount = totalCountPerProduct[product.id];
        const currentProductCountSpan = document.querySelector(
            `.product-count-for-id${id}`
        );
        if (this.cnt <= 3) {
            currentProductCount > 1
                ? (currentProductCountSpan.textContent = currentProductCount)
                : (productsContainer.innerHTML += `
        <li class="product-in-cart">
          <div class="item-in-cart">
            <div
              class="item-in-cart_img"
              style="
                background-image: url('${src}');
                background-size: 100%;
                background-repeat: no-repeat;
              "
            ></div>
            <div class="item-in-cart_name">
              ${title}
            </div>
            <div class="product-count-for-id${id} product-count">
            </div>
            <div class="item-in-cart_price">${formatNumber(price)}</div>
          </div>
        </li>
        `);
        }
    }

    getCountProduct() {
        return this.items.length;
    }
}

const amountProduct = document.querySelector(".amount-in-cart p");
amountProduct.textContent = "0 Thêm vào giỏ hàng";
const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
[...addToCartBtns].forEach((btn) => {
    btn.addEventListener("click", (event) => {
        cart.addItem(Number(event.target.id), allProducts);
        amountProduct.textContent = `${cart.getCountProduct()} Thêm vào giỏ hàng`;
    });
});
