function renderTopSearchProduct() {
    const allProductTopSarch = [
        {
            img: "https://down-vn.img.susercontent.com/file/5ddbc585b7e9eaf10430c968f7a7d787",
            amount: 126000,
            nameProduct: "gập bẻ tập cơ tay",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/8e78019372e7c63a5c2f372d35532e56",
            amount: 129000,
            nameProduct: "balo thời trang",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/dc04a555685a9720d9da6655217a224f",
            amount: 60000,
            nameProduct: "bình giữ nhiệt",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/309e98d0c002c62b867a00bc639bdbae",
            amount: 69000,
            nameProduct: "bộ chăn ga gối cotton",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/461ccdf88d457131aaa7edef87613193",
            amount: 63000,
            nameProduct: "vòng đeo tay hợp kim",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/fad24d1b5caab802481090b9be5a5efa",
            amount: 69000,
            nameProduct: "ruột sổ còng",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/fad24d1b5caab802481090b9be5a5efa",
            amount: 69000,
            nameProduct: "ruột sổ còng",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/6d1416daa515aaf1a3c1b6c5fc47e07b",
            amount: 173000,
            nameProduct: "Ốp lưng Iphone",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/ea3c6a73cbd32bddb8323c14b837b4de",
            amount: 103000,
            nameProduct: "Bút mực Gel",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/af40edba655e36fd80f6b7da6e7dc41c",
            amount: 119000,
            nameProduct: "Áo thun",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/e3568f284358e6f5c46223036e54ef84",
            amount: 166000,
            nameProduct: "Bông Tẩy Trang 3 Lớp Cotton Pads",
        },
        {
            img: "https://down-vn.img.susercontent.com/file/30a8c88309e8f1c95f0f32fd3e368bb5",
            amount: 118000,
            nameProduct: "Giấy Ăn Gấu Trúc Sipiao",
        },
    ];
    const topSearcProductList = document.querySelector(".ts_content_list");
    const productsTopSarch = allProductTopSarch
        .map((val) => {
            return `
      <div class="ts_item_wrap swiper-slide">
        <a href="#" class="ts_link">
          <div class="ts_item">
            <div class="logo_top"></div>
            <div
              class="ts_image_wrap"
              style="
                background-image: url('${val.img}');
                background-size: contain;
                background-repeat: no-repeat;
              "
            >
              <div class="ts_image"></div>
              <div class="ts_image_scrip">
                bán ${
                    val.amount >= 1000
                        ? `${val.amount / 1000}k+`
                        : `${val.amount}`
                } /tháng
              </div>
            </div>
          </div>
          <div class="ts_nameproduct">${val.nameProduct}</div>
        </a>
      </div>
      `;
        })
        .join("");
    topSearcProductList.innerHTML = productsTopSarch;
}
renderTopSearchProduct();
