function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const flSaleProduct = document.querySelector(".sale_live-product-wrap");
const allProductSaleLeft = [
    {
        head: "Đồ bạn thích ở đây",
        product: [
            {
                img: "/img/shopeelive/len.jpg",
                sale: 5988,
            },
            {
                img: "/img/shopeelive/charge.jpg",
                sale: 90000,
            },
            {
                img: "/img/shopeelive/thatlung.jpg",
                sale: 48000,
            },
        ],
    },
];

const allProductSaleRight = [
    {
        head: "hàng hiệu giá tốt",
        product: [
            {
                img: "/img/shopeelive/vn-11134207-7qukw-lj2jr39xdfbm1c.jpg",
                sale: 40,
            },
            {
                img: "/img/shopeelive/vn-11134207-7qukw-livh4fp1sp8yf7.jpg",
                sale: 20,
            },
            {
                img: "/img/shopeelive/sg-11134201-22100-3w4yssuf06ivb2.jpg",
                sale: 5,
            },
        ],
    },
];

function renderProductSaleLeft() {
    var allProductSaleLeftHTML = allProductSaleLeft[0].product
        .map((val) => {
            return `
      <div>
        <div class="sale_live_item-img">
            <img
            src="${val.img}"
            alt="Picture"
            />
        </div>
        <div
            class="sale_liveprice"
            style="color: rgb(238, 78, 46)"
        >
            ${formatNumber(val.sale)}
        </div>
        </div>
    `;
        })
        .join("");
    flSaleProduct.innerHTML = `
    <div class="sale_live-product-left">
    <div class="sale_live-top">
        <span class="sale_live-upcase text-white">${allProductSaleLeft[0].head}</span>
        <span class="sale_live-capitalize"
            ><a class="sale_live-link-more text-white" href="#">Xem thêm> </a>
        </span>
        </div>
        <div class="sale_live-item">
            ${allProductSaleLeftHTML}
        </div>
    </div>
    `;
}

function renderProductSaleRight() {
    var allProductSaleRightHTML = allProductSaleRight[0].product
        .map((val) => {
            return `
        <div>
          <div class="sale_live_item-img">
              <img
              src="${val.img}"
              alt="Picture"
              />
          </div>
          <div
              class="sale_liveprice"
              style="color: rgb(238, 78, 46)"
          >
              Giảm đến ${val.sale}%
          </div>
          </div>
      `;
        })
        .join("");
    flSaleProduct.innerHTML += `
      <div class="sale_live-product-left">
      <div class="sale_live-top">
          <span class="sale_live-upcase text-white">${allProductSaleRight[0].head}</span>
          <span class="sale_live-capitalize"
              ><a class="sale_live-link-more text-white" href="#">Xem thêm> </a>
          </span>
          </div>
          <div class="sale_live-item">
              ${allProductSaleRightHTML}
          </div>
      </div>
      `;
}

renderProductSaleLeft();
renderProductSaleRight();
