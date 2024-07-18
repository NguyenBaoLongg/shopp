const bannerBottom = document.getElementById("banner_bottom");
var allProductBannerBottom = [
    {
        img: "/img/banner/Khunggiosansale.png",
        desc: "Khung Giờ Săn Sale",
    },
    {
        img: "/img/banner/freeship.png",
        desc: "Miễn Phí Ship - có Shopee",
    },
    {
        img: "/img/banner/voucher.png",
        desc: "Voucher Giảm Đến 500.000Đ",
    },
    {
        img: "/img/banner/outlet.png",
        desc: "Hàng Hiệu Outlet Giảm Đến 50%",
    },
    {
        img: "/img/banner/discount.png",
        desc: "Mã Giảm Giá",
    },
    {
        img: "/img/banner/cheap_image.png",
        desc: "Gì Cũng Rẻ - Deal Sốc Đến 9.000Đ",
    },
    {
        img: "/img/banner/data.png",
        desc: "Nạp thẻ, Dịch Vụ & Data",
    },
    {
        img: "/img/banner/international_product.png",
        desc: "Hàng Quốc Tế",
    },
    {
        img: "/img/banner/trand.png",
        desc: "Bắt Trend - Giá Sốc",
    },
];

function renderBannerBottom() {
    const bannerBottomHTML = allProductBannerBottom
        .map((val) => {
            return `
        <a href="#">
            <div class="banner_bottom-item">
            <div class="banner_bottom-margin">
                <div>
                <div
                    class="banner_bottom-image"
                    style="
                    background-image: url('${val.img}');
                    background-size: contain;
                    background-repeat: no-repeat;
                    "
                ></div>
                </div>
            </div>
            <div class="banner_bottom-describe">
               ${val.desc}
            </div>
            </div>
        </a>
    `;
        })
        .join("");
    bannerBottom.innerHTML = bannerBottomHTML;
}

renderBannerBottom();
