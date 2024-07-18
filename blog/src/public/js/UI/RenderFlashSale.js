//Flash sale
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
var flashSaleList = document.querySelector(".flashsell_list");
const allProductsFlashSale = [
    {
        img: "https://down-vn.img.susercontent.com/file/sg-11134201-23010-4s99xpf6vemv08_tn",
        price: 129000,
        statusDescript: "đang bán chạy",
        status: 6,
    },
    {
        img: "https://down-vn.img.susercontent.com/file/805a1beaafdabea9a1cca68d751376fe_tn",
        price: 1359000,
        statusDescript: 9,
        status: 90,
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-eefb01c19317106d4d3bcc4e497b86a5_tn",
        price: "245000",
        statusDescript: "đang bán chạy",
        status: 6,
    },
    {
        img: "https://down-vn.img.susercontent.com/file/793480c24f598832df25cfcb749656e4_tn",
        price: 308000,
        statusDescript: 8,
        status: 80,
    },
    {
        img: "https://down-vn.img.susercontent.com/file/37942ebc3688a75f5baa44abaa2e4780_tn",
        price: 250750,
        statusDescript: 12,
        status: 30,
    },
    {
        img: "https://down-vn.img.susercontent.com/file/a6bd3e205f29a007b85382cee64a6a33_tn",
        price: 159000,
        statusDescript: "đang bán chạy",
        status: 20,
    },
];

function renderFlashSale() {
    var allProductsFlashSaleArray = allProductsFlashSale
        .map((val) => {
            return `
    <li class="flashsell_list-item">
    <div class="flashsell_product">
        <div class="flashsell_image-wrap">
          <div
            class="flashsell_image"
            style="
              background-image: url('${val.img}');
              background-repeat: no-repeat;
              background-size: contain;
            "
          ></div>
        </div>
        <div class="flashsell_product-bottom">
          <div
            class="flashsell_product-bottom_child"
          >
            <div
              class="flashsell_price"
              style="text-decoration: none"
            >
              <div class="flashsell_price_child1">
                <div class="flashsell_price_child2">
                  <span>₫${formatNumber(val.price)}</span>
                </div>
              </div>
            </div>

            <div
              class="flashsell_price_status-wrap"
            >
              <div
                class="flashsell_price_status-amount"
              >
                <div
                  class="flashsell_price_status-scrip"
                  style="text-decoration: none"
                >
                  ${
                      typeof val.statusDescript === "number"
                          ? `Chỉ còn ${val.statusDescript}`
                          : `${val.statusDescript}`
                  }
                </div>
                <div
                  class="flashsell_price_status"
                  style="width: ${val.status}%; height: 16px"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </li>
    `;
        })
        .join("");
    flashSaleList.innerHTML = allProductsFlashSaleArray;
}

//section deal

function renderSectionDeal() {
    const sectionDeal = document.querySelector(".section_deal");
    const pictureDeal =
        "https://cf.shopee.vn/file/sg-50009109-75effbabbb9736efc3851ae043840dd3";
    sectionDeal.innerHTML = `
  <div class="section_deal_wrap">
  <img src="${pictureDeal}" alt='picture'>
  </div>
  `;
}

// count down time
const countDownNumber = document.querySelectorAll(
    ".count-down-time__number-item"
);

const formatTime = (num) => {
    return num <= 9 ? "0" + num : num;
};

const now = new Date().getTime();
const maxTime = now + 2 * 60 * 60 * 1000;
let check = setInterval(() => {
    let currentTime = new Date().getTime();
    let distance = maxTime - currentTime;
    if (distance <= 0) {
        clearInterval(check);
        countDownNumber.forEach((num) => {
            num.textContent = 0;
        });
        return;
    }
    let hour = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
    );
    let minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
    let second = Math.floor((distance % (60 * 1000)) / 1000);

    let formatHour = formatTime(hour);
    let formatMinute = formatTime(minute);
    let formatSecond = formatTime(second);

    let timeArray = (formatHour + formatMinute + formatSecond).split("");
    for (let i = 0; i < countDownNumber.length; i++) {
        countDownNumber[i].textContent = timeArray[i];
    }
}, 1000);

renderFlashSale();
renderSectionDeal();
