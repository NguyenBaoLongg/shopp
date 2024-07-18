var imagesOfBanner = [
    "https://cf.shopee.vn/file/vn-50009109-b50873b90e3fe86b43cb609337ffdc16_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-ce6f4ad7ccd1a196121a120e12d04584_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-b50873b90e3fe86b43cb609337ffdc16_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-99b4ae712c5d920ec6151cc9cd4467b3_xxhdpi",
    "https://cf.shopee.vn/file/vn-50009109-2bb6d8c4d70a75ec5f4945356e9c4b44_xxhdpi",
];

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

function renderSlideMain() {
    var showBanner = document.querySelector(`.show-slide`);
    const imgOfSlide = imagesOfBanner
        .map((val) => {
            return `
        <li class="show_banner-list-item " >
            <a href="">
              <div class="wrap-item">
                  <img src="${val}" alt="" class="img_of_slider">                                                  
              </div>
            </a>
          </li>
      `;
        })
        .join("");
    if (showBanner) {
        showBanner.innerHTML = imgOfSlide;
    }
}

function swiperSlideOfBanner() {
    renderSlideMain();
    handleSectionDots(".start-show_banner", imagesOfBanner);
    const showBanner = document.querySelector(`.show-slide`);
    const btnLeft = document.querySelector(`.icon-more_left`);
    const btnRight = document.querySelector(`.icon-more_right`);
    const imgs = document.querySelectorAll(`.show-slide img`);
    const length = imgs.length;
    let currentSlideIndex = 0;

    const handleChangeSlide = () => {
        if (currentSlideIndex == length - 1) {
            currentSlideIndex = 0;
            let width = imgs[0].offsetWidth;
            showBanner.style.transform = `translateX(0px)`;
            document.querySelector(`.active`).classList.remove("active");
            document
                .querySelector(`.dot-${currentSlideIndex}`)
                .classList.add("active");
        } else {
            currentSlideIndex++;
            let width = imgs[0].offsetWidth;
            showBanner.style.transform = `translateX(${
                width * -currentSlideIndex
            }px)`;
            document.querySelector(`.active`).classList.remove("active");
            document
                .querySelector(`.dot-${currentSlideIndex}`)
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

swiperSlideOfBanner();
