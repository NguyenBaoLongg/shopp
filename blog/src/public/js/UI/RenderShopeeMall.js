const handleSectionDots = (parentElement, images) => {
    const sectionDots = document.querySelector(
        `${parentElement} .section-dots`
    );
    let cnt = 0;
    const dots = images
        .map(() => {
            return `
      <div class="section-dot dot-${cnt++}"></div>
      `;
        })
        .join("");
    if (sectionDots) {
        sectionDots.innerHTML = dots;
        const activeDot = document.querySelector(`${parentElement}  .dot-0`);
        activeDot.classList.add("active");
    }
};

const imagesOfShopeeMall = [
    "https://cf.shopee.vn/file/vn-50009109-63d358b63ab3e8276ceb63a90338ae53",
    "https://cf.shopee.vn/file/vn-50009109-44c3b3ddf43f4db7fd65536f5435682c",
    "https://cf.shopee.vn/file/vn-50009109-aadb2df8bbe5ce4540fe3309ff16148d",
    "https://cf.shopee.vn/file/vn-50009109-05aea49caef33affda793723750a5985",
    "https://cf.shopee.vn/file/vn-50009109-f8c6b54e1d59068994d4c0009cebced1",
];

const bannerShoppeMall = document.querySelector(".home_page_list-item");
function renderOfHomePage() {
    bannerShoppeMall.innerHTML = imagesOfShopeeMall
        .map((val) => {
            return `
        <li class="image_of_banner">
          <div class="item-inner_banner">
              <div>
                  <a href="">
                      <img src="${val}" alt="" class="image-banner">
                  </a>
              </div>
          </div>
        </li>
        `;
        })
        .join("");
}

function renderSlideOfShopeeMall() {
    renderOfHomePage();
    handleSectionDots(".hmall_content", imagesOfShopeeMall);

    const showBanner = document.querySelector(`.home_page_list-item`);
    const btnLeft = document.querySelector(`.hmall_content .icon-more_left`);
    const btnRight = document.querySelector(`.hmall_content .icon-more_right`);
    const imgs = document.querySelectorAll(`.image-banner`);
    const length = imgs.length;
    let currentSlideIndex = 0;

    const handleChangeSlide = () => {
        if (currentSlideIndex == length - 1) {
            currentSlideIndex = 0;
            let width = imgs[0].offsetWidth;
            showBanner.style.transform = `translateX(0px)`;
            document
                .querySelector(`.hmall_content .active`)
                .classList.remove("active");
            document
                .querySelector(`.hmall_content .dot-${currentSlideIndex}`)
                .classList.add("active");
        } else {
            currentSlideIndex++;
            let width = imgs[0].offsetWidth;
            showBanner.style.transform = `translateX(${
                width * -currentSlideIndex
            }px)`;
            document
                .querySelector(`.hmall_content .active`)
                .classList.remove("active");
            document
                .querySelector(`.hmall_content .dot-${currentSlideIndex}`)
                .classList.add("active");
        }
    };

    btnRight.addEventListener("click", () => {
        clearInterval(handleEventChangeSlide);
        handleChangeSlide();
        handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
    });

    btnLeft.addEventListener("click", () => {
        clearInterval(handleEventChangeSlide);
        if (currentSlideIndex == 0) {
            currentSlideIndex = length - 1;
            width = imgs[0].offsetWidth;
            showBanner.style.transform = `translateX(${
                width * -1 * currentSlideIndex
            }px)`;
        } else {
            currentSlideIndex--;
            let width = imgs[0].offsetWidth;
            showBanner.style.transform = `translateX(${
                width * -currentSlideIndex
            }px)`;
        }
        handleEventChangeSlide = setInterval(handleChangeSlide, 10000);
    });

    let handleEventChangeSlide = setInterval(handleChangeSlide, 4000);
}

renderSlideOfShopeeMall();

//render content shopee mall

const brands = [
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-cebfae17cd5979d823fb74ac79a922fa_xhdpi",
        scrip: "mua là có quà",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/be40023a9d9cff397a470460bc7a924d_xhdpi",
        scrip: "deli siêu sale",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-08a87dd1e828b4bef31dafa67d5300ec_xhdpi",
        scrip: "quà mọi đơn",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-06fb832ef52b45481158c26831cc459b_xhdpi",
        scrip: "thời trang -50%",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-e8e0b80b57828bee61eb7e31c3d83765_xhdpi",
        scrip: "giảm đến 50%",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-079ef6ec5c89b6a436c4455226841cd6_xhdpi",
        scrip: "mua là có quà",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-7e80ab64bdc989f5c0862ed828f343a2_xhdpi",
        scrip: "ưu đãi đến 50%",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-0be3ac214d6174200ed4f3096a0faa9a_xhdpi",
        scrip: "vourcher 100k",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-b44bb96f2e16efe70badc41661365c8a_xhdpi",
        scrip: "mua 1 tặng 1",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-7ce7d5800afb2b6c80a7242236ec7409_xhdpi",
        scrip: "mua là có quà",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-cba651d4c1f1b46e6fb41b8c44c4cabb_xhdpi",
        scrip: "mua là có quà",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/9ab2f66b65f4f8a3861f22668a380231_xhdpi",
        scrip: "mua là có quà",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-e8e0b80b57828bee61eb7e31c3d83765_xhdpi",
        scrip: "giảm đến 50%",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-5d6b20755f4ef36cf1f73d431c819c9e_xhdpi",
        scrip: "mua là có quà",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/vn-50009109-87186ed98227adab30afbe0f244f49a4_xhdpi",
        scrip: "giảm đến 50%",
    },
    {
        img: "https://down-vn.img.susercontent.com/file/5fb3f7b359a582f322ea39313e10260b_xhdpi",
        scrip: "mua 1 tặng 1",
    },
];

function renderCListBrandShopeeMall() {
    const listBrand = document.querySelector(".list_brand");
    const listBrandHTML = brands
        .map((val) => {
            return `
      <li class="brand_item" style="padding: 0">
        <div class="brand_item_cover">
          <a href="#" class="brand_item_link">
            <div class="brand_item_image_wrap">
              <div class="list_brand_image">
                <div
                  class="list_brand_image_fix"
                  style="
                    background-image: url('${val.img}');
                    background-repeat: no-repeat;
                    background-size: contain;
                  "
                ></div>
              </div>
            </div>
          </a>
          <div class="brand_item_scrip">
            ${val.scrip}
          </div>
        </div>
      </li>
      `;
        })
        .join("");
    listBrand.innerHTML = listBrandHTML;

    const btnLeftBrand = document.querySelector(
        ".hmall_carousel .icon-more_left"
    );
    const btnRightBrand = document.querySelector(
        ".hmall_carousel .icon-more_right"
    );

    let widthBrand = listBrand.offsetWidth;

    btnRightBrand.addEventListener("click", () => {
        listBrand.style.transform = `translateX(${widthBrand * -1}px)`;
        btnLeftBrand.classList.remove("invisible");
        btnRightBrand.classList.add("invisible");
        btnLeftBrand.style.transform = "translateX(calc(-50% + 0px))";
    });

    btnLeftBrand.addEventListener("click", () => {
        listBrand.style.transform = `translateX(0px)`;
        btnRightBrand.classList.remove("invisible");
        btnLeftBrand.classList.add("invisible");
        btnRightBrand.style.transform = "translateX(calc(50% + 0px))";
    });
}

renderCListBrandShopeeMall();
